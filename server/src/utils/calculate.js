import Accounts from "../models/accounts.js";
import TradeStats from "../models/tradeStats.js";
import TradeJournal from "../models/tradeJournal.js";
import Transaction from "../models/transaction.js";
import TradeDetails from "../models/tradeDetails.js";
import { DateRangeFilter } from "./general.js";

export const CalculateTradeStats = async (Action, EntryPrice, ExitPrice, StopLoss, Quantity, Fees, AccountId) => {

    const account = await Accounts.findOne({ AccountId });
    const _capital = account.TotalBalance;

    const _grossPnL = parseFloat((ExitPrice - EntryPrice) * Quantity).toFixed(2);
    const _netPnL = parseFloat((_grossPnL - Fees).toFixed(2));
    const _tradeRisk = parseFloat((EntryPrice - StopLoss) * Quantity + Fees).toFixed(2);
    const _tradeStatus = EntryPrice < ExitPrice ? (Action === 'Buy' ? 'WIN' : 'LOSS') : (EntryPrice > ExitPrice ? (Action === 'Sell' ? 'WIN' : 'LOSS') : 'BREAKEVEN');
    const _netProfit = _tradeStatus === 'WIN' ? _netPnL : 0;
    const _netLoss = _tradeStatus === 'LOSS' ? _netPnL : 0;
    const riskReward = ((ExitPrice - EntryPrice) / (EntryPrice - StopLoss)).toFixed(2);

    return {
        tradeStatus: _tradeStatus,
        netProfit: _netProfit,
        netLoss: _netLoss,
        netPnL: _netPnL,
        netRoi: parseFloat((_netPnL / _capital * 100).toFixed(2)),
        grossPnL: parseFloat(_grossPnL).toFixed(2),
        totalFees: Fees,
        tradeRisk: _tradeRisk,
        riskReward: riskReward
    };
}

export const CalculateHandleJournal = async (TradeId, UserId, AccountId, currentStats, todaysDate) => {

    const { tradeStatus, netPnL, grossPnL, riskReward, totalFees } = currentStats;

    // Fetch account details
    const account = await Accounts.findOne({ AccountId });
    const _capital = account.InitialBalance;
    const _totalCapital = account.TotalBalance;
    
    // Initialize variables
    let _totalNetPnL = netPnL, _totalTrades = 1, _tradeStatus = tradeStatus === 'WIN' ? 'PROFIT' : 'LOSS', _totalWins = tradeStatus === 'WIN' ? 1 : 0, _totalLoss = tradeStatus === 'LOSS' ? 1 : 0, _Winrate = 0, _totalFees = totalFees, _totalGrossPnL = grossPnL, _totalRR = riskReward, _netRevenue = netPnL, _grossRevenue = (totalFees + _netRevenue + _capital), _totalRevenue = _netRevenue + _totalCapital, _netRoi = parseFloat((netPnL / _capital * 100).toFixed(2));

    // Define date range for today's trades
    let end = new Date(todaysDate);
    let start = new Date(end);
    start.setDate(end.getDate() - 1);

    // Fetch today's journal entry if it exists
    const getJournal = await TradeJournal.findOne({
        JournalDate: {
            $gte: start,
            $lt: end
        }
    });

    // If a journal entry exists for today, update it. Otherwise, create a new entry.
    if (getJournal !== null) {

        //Reseting the variables for calculating
        _totalNetPnL = 0;
        _totalTrades = 0;
        _totalWins = 0;
        _totalLoss = 0;
        _Winrate = 0;
        _totalFees = 0;
        _totalGrossPnL = 0;
        _totalRR = 0;
        _netRevenue = 0;
        _grossRevenue = 0;
        _totalRevenue = 0;
        _netRoi = 0;

        const _journalDate = new Date(getJournal.JournalDate).toLocaleDateString();

        if (_journalDate === end.toLocaleDateString()) {

            // Define date range for today's trades
            end.setHours(23, 59, 59, 999); // Set the time to the end of the day
            start = new Date(end);
            start.setDate(end.getDate());
            start.setHours(0, 0, 0, 0);  // Set the time to the start of the day

            // Fetch today's trade stats
            const getTradeStats = await TradeStats.find({
                TradeDate: {
                    $gte: start,
                    $lt: end
                }
            });

            // Calculate fields based on today's trade stats
            getTradeStats.forEach(trade => {
                _totalTrades++;
                _totalFees += trade.TotalFees;
                _totalRR += trade.RiskReward;
                _totalGrossPnL += trade.GrossPnL;

                if (trade.TradeStatus === 'WIN') {
                    _totalWins++;
                    _totalNetPnL = (_totalNetPnL + trade.NetPnL);
                } else {
                    _totalLoss++;
                    _totalNetPnL = (_totalNetPnL + trade.NetPnL);
                }
            });

            // Calculate additional fields
            _Winrate = ((_totalWins / _totalTrades) * 100).toFixed(2);
            _netRevenue = _totalNetPnL;
            _grossRevenue = (_totalGrossPnL + _capital);
            _netRoi = ((_totalNetPnL / _capital) * 100).toFixed(2);
            _totalRevenue = _totalCapital + netPnL;
            _tradeStatus = _totalNetPnL > 0 ? 'PROFIT' : _totalNetPnL === 0 ? 'BREAKEVEN' : 'LOSS'; 

            // Update today's journal entry
            await TradeJournal.updateOne(
                { JournalDate: { $gte: start, $lt: end } },
                {
                    TotalNetPnL: _totalNetPnL,
                    TotalTrades: _totalTrades,
                    TradeStatus: _tradeStatus,
                    TotalWins: _totalWins,
                    TotalLoss: _totalLoss,
                    Winrate: _Winrate,
                    TotalFees: _totalFees,
                    TotalGrossPnL: _totalGrossPnL,
                    TotalRR: (_totalRR).toFixed(2),
                    NetRevenue: _netRevenue,
                    GrossRevenue: _grossRevenue,
                    TotalRevenue: _totalRevenue,
                    TotalRoi: _netRoi,
                    $push: { TradeIds: TradeId },
                    UpdatedBy: UserId
                }
            );
        }
    }
    //Creating a new entry. Insert a new journal entry for today
    else {
        // Find the last Id from Collection. If record does'nt exist, start with 1, otherwise increment the last Id
        let lastId = await TradeJournal.findOne().sort('-JournalId');
        const JournalId = lastId ? lastId.JournalId + 1 : 1;
        end.setDate(end.getDate());
        end.setHours(0, 0, 0, 0);

        const newJournal = new TradeJournal({
            JournalId: JournalId,
            JournalDate: end,
            TotalNetPnL: _totalNetPnL,
            TotalTrades: _totalTrades,
            TradeStatus: _tradeStatus,
            TotalWins: _totalWins,
            TotalLoss: _totalLoss,
            Winrate: _Winrate,
            TotalFees: _totalFees,
            TotalGrossPnL: _totalGrossPnL,
            TotalRR: _totalRR,
            NetRevenue: _netRevenue,
            GrossRevenue: _grossRevenue,
            TotalRevenue: _totalRevenue,
            TotalRoi: _netRoi,
            AccountId,
            UserId,
            CreatedBy: UserId
        });
        newJournal.TradeIds.push(TradeId);
        await newJournal.save();
    }

    // Find the last Id from Collection. If record does'nt exist, start with 1, otherwise increment the last Id
    let lastId = await Transaction.findOne().sort('-TransactionId');
    const TransactionId = lastId ? lastId.TransactionId + 1 : 1;

    const newTransaction = new Transaction({
        TransactionId: TransactionId,
        TransName: _tradeStatus,
        TransAmount: netPnL,
        AccountId,
        UserId,
        CreatedBy: UserId
    });
    await newTransaction.save();

    // Update the Account's Collection
    await Accounts.updateOne(
        { AccountId: AccountId },
        {
            TotalBalance: (_totalCapital + netPnL)
        }
    );
}

/* Fetching and calculating data for dashboard & analytics*/
export const CalculateStatistics = async (req, res) => {
    const { UserId } = req.body;

    const account = await Accounts.findOne({ UserId: UserId, AccountId: req.params.accountId }).select(['TotalBalance', 'InitialBalance']);

    if (account) {

        const tradeStatsFilter = DateRangeFilter(req, "TradeDate");
        const tradeJournalFilter = DateRangeFilter(req, "JournalDate");

        const { TotalBalance, InitialBalance } = account;
        const _tradeCount = await TradeStats.where(tradeStatsFilter).countDocuments();
        const _totalTradeDays = await TradeJournal.where(tradeJournalFilter).countDocuments();
        const tradeOpenedFilter = DateRangeFilter(req, "EntryDate");
        tradeOpenedFilter.TradeStatus = 'Opened';
        const _tradeOpenedCount = await TradeDetails.where(tradeOpenedFilter).countDocuments();

        let _totalProfit = 0, _totalLoss = 0, _averagePnl = 0, _maxProfit = 0, _maxLoss = 0, _minProfit = 0, _minLoss = 0, _totalFees = 0, _avgProfit = 0, _avgLoss = 0, _totalWins = 0, _totalLosses = 0, _winDays = 0, _lossDays = 0, _netDailyPnl = 0, _convWins, _convLoss, averageHoldTime = 0, averageWinHoldTime = 0, averageLossHoldTime = 0;

        //#region Basic Calculation
        const result = await TradeStats.aggregate([
            { $match: tradeStatsFilter },
            {
                $group: {
                    _id: null,
                    totalProfit: { $sum: '$NetProfit' },
                    totalLoss: { $sum: '$NetLoss' },
                    averagePnl: { $avg: '$NetPnL' },
                    maxProfit: { $max: '$NetProfit' },
                    minProfit: { $min: '$NetProfit' },
                    maxLoss: { $min: '$NetLoss' },
                    minLoss: { $max: '$NetLoss' },
                    totalFees: { $sum: '$TotalFees' },
                    avgProfit: { $avg: { $cond: [{ $eq: ["$TradeStatus", "WIN"] }, "$NetPnL", 0] } },
                    avgLoss: { $avg: { $cond: [{ $eq: ["$TradeStatus", "LOSS"] }, "$NetPnL", 0] } },
                    countWin: { $sum: { $cond: [{ $eq: ["$TradeStatus", "WIN"] }, 1, 0] } },
                    countLoss: { $sum: { $cond: [{ $eq: ["$TradeStatus", "LOSS"] }, 1, 0] } },
                }
            }
        ]);
        //#endregion

        //#region Calaculating Overall Minimum Profit
        const minProfitFilters = DateRangeFilter(req, "TradeDate");
        minProfitFilters.NetProfit = { $ne: 0 };
        const getMinProfit = await TradeStats.aggregate([
            {
                $match: minProfitFilters
            },
            {
                $group: {
                    _id: null,
                    minProfit: { $min: '$NetProfit' },
                }
            }
        ]);
        //#endregion

        //#region Calaculating Overall Minimum Loss
        const minLossFilters = DateRangeFilter(req, "TradeDate");
        minLossFilters.NetLoss = { $ne: 0 };

        const getMinLoss = await TradeStats.aggregate([
            {
                $match: minLossFilters
            },
            {
                $group: {
                    _id: null,
                    minLoss: { $max: '$NetLoss' },
                }
            }
        ]);
        //#endregion

        //#region Calculating TotalWinDays, TotalLossDays & DailyAveragePnL
        const getDays = await TradeJournal.aggregate([
            { $match: tradeJournalFilter },
            {
                $group: {
                    _id: null,
                    totalWinDays: { $sum: { $cond: [{ $gt: ['$TotalNetPnL', 0] }, 1, 0,], }, },
                    totalLossDays: { $sum: { $cond: [{ $lt: ['$TotalNetPnL', 0] }, 1, 0,], }, },
                    netDailyPnl: { $avg: '$TotalNetPnL' },
                },
            },
        ]);
        //#endregion

        //#region Calculating Consecutive Win/Loss
        const getConsecutive = await TradeStats.aggregate([
            { $match: tradeStatsFilter },
            {
                $sort: { TradeDate: 1 }
            },
            {
                $group: {
                    _id: null,
                    trades: {
                        $push: "$$ROOT"
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    maxStreaks: {
                        $reduce: {
                            input: "$trades",
                            initialValue: { winStreak: 0, lossStreak: 0, maxWinStreak: 0, maxLossStreak: 0, prevStatus: "" },
                            in: {
                                winStreak: {
                                    $cond: [
                                        { $eq: ["$$this.TradeStatus", "WIN"] },
                                        { $add: ["$$value.winStreak", 1] },
                                        0
                                    ]
                                },
                                lossStreak: {
                                    $cond: [
                                        { $eq: ["$$this.TradeStatus", "LOSS"] },
                                        { $add: ["$$value.lossStreak", 1] },
                                        0
                                    ]
                                },
                                maxWinStreak: {
                                    $cond: [
                                        { $eq: ["$$this.TradeStatus", "WIN"] },
                                        { $max: ["$$value.maxWinStreak", { $add: ["$$value.winStreak", 1] }] },
                                        "$$value.maxWinStreak"
                                    ]
                                },
                                maxLossStreak: {
                                    $cond: [
                                        { $eq: ["$$this.TradeStatus", "LOSS"] },
                                        { $max: ["$$value.maxLossStreak", { $add: ["$$value.lossStreak", 1] }] },
                                        "$$value.maxLossStreak"
                                    ]
                                },
                                prevStatus: "$$this.TradeStatus"
                            }
                        }
                    }
                }
            }
        ]);
        //#endregion

        //#region Calculating Trade Hold Time
        const tradeHoldTime = await TradeDetails.aggregate([
            { $match: DateRangeFilter(req, "EntryDate") },
            {
                $lookup: {
                    from: "TradeStats",
                    localField: "TradeId",
                    foreignField: "TradeId",
                    as: "TradeStats"
                }
            },
            {
                $unwind: "$TradeStats"
            },
            {
                $project: {
                    TradeId: 1,
                    TradeName: 1,
                    EntryDate: 1,
                    ExitDate: 1,
                    HoldTime: { $subtract: ["$ExitDate", "$EntryDate"] },
                    TradeStatus: "$TradeStats.TradeStatus"
                }
            }
        ]);

        if (tradeHoldTime.length > 0) {
            let totalHoldTime = 0;
            let winHoldTime = 0;
            let lossHoldTime = 0;
            let winCount = 0;
            let lossCount = 0;

            tradeHoldTime.forEach(trade => {
                totalHoldTime += trade.HoldTime;

                if (trade.TradeStatus === 'WIN') {
                    winHoldTime += trade.HoldTime;
                    winCount++;
                } else if (trade.TradeStatus === 'LOSS') {
                    lossHoldTime += trade.HoldTime;
                    lossCount++;
                }
            });

            averageHoldTime = totalHoldTime / tradeHoldTime.length;
            averageWinHoldTime = winCount > 0 ? winHoldTime / winCount : 0;
            averageLossHoldTime = lossCount > 0 ? lossHoldTime / lossCount : 0;
        }
        //#endregion

        //#region Extract the fields from the result
        if (result.length > 0 && getDays.length > 0 && getConsecutive.length > 0) {
            const { totalProfit, totalLoss, averagePnl, maxProfit, maxLoss, totalFees, avgProfit, avgLoss, countWin, countLoss } = result[0];

            const { totalWinDays, totalLossDays, netDailyPnl } = getDays[0];
            const { maxWinStreak, maxLossStreak } = getConsecutive[0].maxStreaks;

            // Update the local variables with the values from the database
            _totalProfit = totalProfit;
            _totalLoss = totalLoss;
            _averagePnl = averagePnl.toFixed(2);
            _maxProfit = maxProfit;
            _maxLoss = maxLoss;
            _totalFees = totalFees;
            _avgProfit = avgProfit.toFixed(2);
            _avgLoss = avgLoss.toFixed(2);
            _totalWins = countWin;
            _totalLosses = countLoss;
            _winDays = totalWinDays;
            _lossDays = totalLossDays;
            _netDailyPnl = netDailyPnl;
            _convWins = maxWinStreak;
            _convLoss = maxLossStreak;
        }

        if (getMinProfit.length > 0 && getMinLoss.length > 0) {
            const { minProfit } = getMinProfit[0];
            const { minLoss } = getMinLoss[0];

            _minProfit = minProfit;
            _minLoss = minLoss;
        }
        //#endregion

        const _totalRevenue = _tradeCount === 0 ? 0 : parseFloat(TotalBalance).toFixed(2);
        const _totalPnl = _tradeCount === 0 ? 0 : parseInt((TotalBalance - InitialBalance));
        const _Winrate = _tradeCount === 0 ? 0 : parseFloat((_totalWins / _tradeCount) * 100).toFixed(2);
        const _roi = _tradeCount === 0 ? 0 : parseFloat((TotalBalance - InitialBalance) / InitialBalance * 100).toFixed(2);

        const _totalRR = (_totalProfit !== 0 && _totalLoss !== 0) ? Math.abs(((_totalProfit / InitialBalance) * 100) / ((_totalLoss / InitialBalance) * 100)).toFixed(2) : 0;
        const _grossPnl = (_totalPnl + _totalFees).toFixed(2);
        const _profitFactor = (_totalProfit !== 0 && _totalLoss !== 0) ? Math.abs((_totalProfit / _totalLoss)).toFixed(2) : 0;

        const responseData = {
            totalRevenue: _totalRevenue,
            totalPnl: _totalPnl,
            Winrate: _Winrate,
            totalTrades: _tradeCount,
            roi: _roi,
            totalProfit: _totalProfit,
            totalLoss: _totalLoss,
            averagePnl: _averagePnl,
            maxProfit: _maxProfit,
            maxLoss: _maxLoss,
            minProfit: _minProfit,
            minLoss: _minLoss,
            totalFees: _totalFees,
            totalRR: _totalRR,
            avgProfit: _avgProfit,
            avgLoss: _avgLoss,
            TotalWins: _totalWins,
            TotalLosses: _totalLosses,
            GrossPnl: _grossPnl,
            netDailyPnl: _netDailyPnl,
            maxConsecutiveWins: _convWins,
            maxConsecutiveLosses: _convLoss,
            netDailyPnl: _netDailyPnl,
            Breakeven: 0, //TODO :- To be calculated
            TimeAllTrades: `${Math.floor(averageHoldTime / 1000 / 60 / 60)} Hours ${Math.floor((averageHoldTime / 1000 / 60) % 60)} Minutes`,
            TimeWinTrades: `${Math.floor(averageWinHoldTime / 1000 / 60 / 60)} Hours ${Math.floor((averageWinHoldTime / 1000 / 60) % 60)} Minutes`,
            TimeLossTrades: `${Math.floor(averageLossHoldTime / 1000 / 60 / 60)} Hours ${Math.floor((averageLossHoldTime / 1000 / 60) % 60)} Minutes`,
            OpenedTrades: _tradeOpenedCount,
            ProfitFactor: _profitFactor,
            TotalTradeDays: _totalTradeDays,
            TotalWinsDays: _winDays,
            TotalLossDays: _lossDays,
        };
        res.status(200).json(responseData);
    }
    else {
        res.status(404).json({ error: "Account not found" });
    }
}