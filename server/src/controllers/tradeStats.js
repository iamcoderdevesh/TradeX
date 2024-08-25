import TradeStats from "../models/tradeStats.js";
import TradeJournal from "../models/tradeJournal.js";
import Accounts from "../models/accounts.js";
import { DateRangeFilter } from "../utils/general.js";

/* Inserting/Updating Calculated Trade statistics in TradeStats */
export const AddUpdateTradeStats = async (req, res, next) => {

    const { TradeId, AccountId, UserId, Stats, EntryDate, IsImport = false } = req.body;
    const { tradeStatus, netProfit, netLoss, netPnL, netRoi, grossPnL, totalFees, tradeRisk, riskReward } = Stats;

    //Date Time Reset
    const _tradeDate = new Date(EntryDate);
    _tradeDate.setHours(0, 0, 0, 0);

    //Checking the records exists or not
    const tradeStats = await TradeStats.findOne({ UserId, AccountId, TradeId });

    //If record exists Update TradeStats
    if (tradeStats) {
        req.body.prevNetPnl = tradeStats?.NetPnL && (parseInt(tradeStats?.NetPnL * -1)); //Required for Updating Trade (Journal Calulation)
        const updateTrade = await TradeStats.findOneAndUpdate(
            { UserId, AccountId, TradeId },
            { TradeStatus: tradeStatus, NetProfit: netProfit, NetLoss: netLoss, NetPnL: netPnL, NetRoi: netRoi, TotalFees: totalFees, GrossPnL: grossPnL, TradeRisk: tradeRisk, RiskReward: riskReward, TradeDate: _tradeDate, AccountId, CreatedBy: UserId },
        );

        if (!updateTrade) {
            res.status(400).json({ error: "Oops Something Went! Unable to Update Trade Stats" });
        }
    }
    //Else Insert new TradeStats
    else {
        // Find the last Id from Collection. If record does'nt exist, start with 1, otherwise increment the last Id
        let lastId = await TradeStats.findOne().sort('-TradeStatsId');
        const TradeStatsId = lastId ? lastId.TradeStatsId + 1 : 1;

        const newStats = new TradeStats({
            TradeStatsId, TradeStatus: tradeStatus, NetProfit: netProfit, NetLoss: netLoss, NetPnL: netPnL, NetRoi: netRoi, TotalFees: totalFees, GrossPnL: grossPnL, TradeRisk: tradeRisk, RiskReward: riskReward, TradeDate: _tradeDate, TradeId, AccountId, UserId, CreatedBy: UserId,
        });

        const tradeStats = await newStats.save();
        if (!tradeStats) {
            res.status(400).json({ error: "Oops Something Went! Unable to Insert Trade Stats" });
        }
    }

    if(IsImport) {
        return true;
    }
    next();
};

//#region Dashboard Charts
export const getTotalPnL = async (req, res) => {
    const FilterName = "TradeDate";
    const Filters = DateRangeFilter(req, FilterName);

    const tradeStats = await TradeStats.find(Filters).select('NetPnL -_id');
    const data = tradeStats.map(item => item.NetPnL);
    return res.status(200).json({
        success: true,
        tradeStats: data
    });
}

export const getWeeklyPnL = async (req, res) => {
    const { UserId } = req.body; //Date Range is not applied

    const account = await Accounts.findOne({ UserId: UserId, AccountId: parseInt(req.params?.accountId) }).select('TotalBalance');

    const { TotalBalance = 0 } = account || [];

    const dayMap = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const today = new Date();
    const day = today.getDay();
    const daysOfWeek = [0, 1, 2, 3, 4, 5, 6].map(dayIndex => ({
        Day: dayMap[(day + 6 - dayIndex) % 7],
        NetPnl: 0,
    }));

    const startDate = new Date();
    startDate.setDate(today.getDate() - 6);
    startDate.setHours(0, 0, 0, 0);

    const getStats = await TradeJournal.aggregate([
        {
            $match: {
                UserId: UserId,
                AccountId: parseInt(req.params.accountId),
                JournalDate: {
                    $gte: startDate,
                    $lte: today,
                },
            },
        },
        {
            $group: {
                _id: {
                    $dayOfWeek: '$JournalDate',
                },
                TotalNetPnL: {
                    $sum: '$TotalNetPnL',
                },
            },
        },
        {
            $sort: {
                _id: 1,
            },
        },
        {
            $project: {
                Day: '$_id',
                NetPnl: '$TotalNetPnL',
                _id: 0,
            },
        },
    ]);

    let totalNetPnL = 0;
    if (getStats.length > 0) {
        const dayMap = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        getStats.forEach(stat => {
            // Convert the day number to a day name
            let dayName = dayMap[stat.Day];

            // Find the corresponding day in the daysOfWeek array
            let dayOfWeek = daysOfWeek.find(day => day.Day === dayName);

            // Update the NetPnl for that day
            if (dayOfWeek) {
                totalNetPnL += stat.NetPnl;
                dayOfWeek.NetPnl = stat.NetPnl;
            }
        });
    }

    const netPnl = daysOfWeek?.map(day => day.NetPnl)?.reverse();
    const categories = daysOfWeek?.map(day => day.Day)?.reverse();
    const weeklyReturns = parseFloat((totalNetPnL / TotalBalance) * 100).toFixed(2);

    return res.status(200).json({
        success: true,
        weeklyPnl: {
            totalNetPnL,
            weeklyReturns,
            netPnl,
            categories
        }
    });
}

export const getMonthlyPnLAndRevenue = async (req, res) => {
    const { UserId } = req.body; //Date Range Filter is not applied

    const account = await Accounts.findOne({ UserId: UserId, AccountId: parseInt(req.params.accountId) }).select('InitialBalance');

    const { InitialBalance = 0 } = account || [];
    const monthMap = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    const currentYear = new Date().getFullYear();
    const monthlyStats = monthMap.map(month => ({
        Month: month,
        TotalNetPnL: 0,
        TotalRevenue: 0
    }));

    const getStats = await TradeJournal.aggregate([
        {
            $match: {
                UserId: UserId,
                AccountId: parseInt(req.params.accountId),
                $expr: {
                    $eq: [{ $year: "$JournalDate" }, currentYear]
                }
            },
        },
        {
            $group: {
                _id: {
                    $month: '$JournalDate',
                },
                TotalNetPnL: {
                    $sum: '$TotalNetPnL',
                },
            },
        },
        {
            $sort: {
                _id: 1,
            },
        },
        {
            $project: {
                Month: '$_id',
                TotalNetPnL: '$TotalNetPnL',
                _id: 0,
            },
        },
    ]);

    if (getStats.length > 0) {
        let totalPnl = 0;
        getStats.forEach(stat => {
            // Convert the month number to a month name
            let monthName = monthMap[stat.Month - 1];

            // Find the corresponding month in the monthlyStats array
            let monthStat = monthlyStats.find(month => month.Month === monthName);

            // Update the TotalNetPnL and NetRevenue for that month
            if (monthStat) {
                monthStat.TotalNetPnL = stat.TotalNetPnL;
                monthStat.TotalRevenue = InitialBalance + stat.TotalNetPnL + totalPnl;
                totalPnl += stat.TotalNetPnL;
            }
        });
    }

    const TotalNetPnL = monthlyStats?.map(value => value.TotalNetPnL);
    const TotalRevenue = monthlyStats?.map(value => value.TotalRevenue);

    return res.status(200).json({
        success: true,
        monthlyStats: {
            TotalNetPnL,
            TotalRevenue
        }
    });

}
//#endregion

//#region Analytics Charts
export const getDailyPnLAndReturns = async (req, res) => {
    const FilterName = "JournalDate";
    const Filters = DateRangeFilter(req, FilterName);

    const getStats = await TradeJournal.find(Filters).select('JournalDate TotalNetPnL TotalRoi -_id');

    if (!getStats) return res.status(404).send('No Data Found!');

    const journalDates = [];
    getStats.forEach(function (item) {
        let date = new Date(item.JournalDate);
        let ISTDate = new Date(date.getTime() + (5.5 * 60 * 60 * 1000));
        const convertedDate = new Date(ISTDate).toISOString().split('T')[0];
        journalDates.push(convertedDate);
    });

    const TotalNetPnl = getStats?.map(trade => trade.TotalNetPnL);
    const TotalRoi = getStats?.map(trade => trade.TotalRoi);

    res.status(200).json({
        success: true,
        stats: {
            journalDates,
            TotalNetPnl,
            TotalRoi
        }
    });
}
//#endregion