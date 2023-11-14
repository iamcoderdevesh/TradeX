import Accounts from "../models/accounts.js";
import TradeStats from "../models/tradeStats.js";
import TradeJournal from "../models/tradeJournal.js";
import Transaction from "../models/transaction.js";

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

    // Update the Account's Collection
    await Accounts.updateOne(
        { AccountId: AccountId },
        {
            TotalBalance: (_totalCapital + netPnL)
        }
    );

    // Initialize variables
    let _totalNetPnL = netPnL, _totalTrades = 1, _totalWins = tradeStatus === 'WIN' ? 1 : 0, _totalLoss = tradeStatus === 'LOSS' ? 1 : 0, _Winrate = 0, _totalFees = totalFees, _totalGrossPnL = grossPnL, _totalRR = riskReward, _netRevenue = netPnL, _grossRevenue = (totalFees + _netRevenue + _capital), _totalRevenue = _netRevenue + _capital;

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
            _Winrate = (_totalWins / _totalTrades) * 100;
            _netRevenue = _totalNetPnL;
            _grossRevenue = (_totalGrossPnL + _capital);
            _totalRevenue = _totalCapital + netPnL;

            // Update today's journal entry
            await TradeJournal.updateOne(
                { JournalDate: { $gte: start, $lt: end } },
                {
                    TotalNetPnL: _totalNetPnL,
                    TotalTrades: _totalTrades,
                    TotalWins: _totalWins,
                    TotalLoss: _totalLoss,
                    Winrate: _Winrate,
                    TotalFees: _totalFees,
                    TotalGrossPnL: _totalGrossPnL,
                    TotalRR: parseFloat(_totalRR).toFixed(2),
                    NetRevenue: _netRevenue,
                    GrossRevenue: _grossRevenue,
                    TotalRevenue: _totalRevenue,
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
            TotalWins: _totalWins,
            TotalLoss: _totalLoss,
            Winrate: _Winrate,
            TotalFees: _totalFees,
            TotalGrossPnL: _totalGrossPnL,
            TotalRR: _totalRR,
            NetRevenue: _netRevenue,
            GrossRevenue: _grossRevenue,
            TotalRevenue: _totalRevenue,
            TradeId,
            AccountId,
            UserId,
            CreatedBy: UserId
        });

        await newJournal.save();
    }

    //Insert Profit/LOSS in Transaction Collection 
    const _tradeStatus = tradeStatus === 'WIN' ? 'PROFIT' : 'LOSS'

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
}

/* Fetching and calculating for dashboard & analytics*/
export const CalculateStatistics = async (req, res) => {
    const { UserId } = req.body;
    const { accountId } = req.params;

    const account = await Accounts.findOne({ UserId: UserId, AccountId: req.params.accountId }).select(['TotalBalance', 'InitialBalance']);

    if (account) {
        const { TotalBalance, InitialBalance } = account;
        const _tradeCount = await TradeStats.where({ UserId: UserId, AccountId: accountId }).countDocuments();
        const _totalTradeDays = await TradeJournal.where({ UserId: UserId, AccountId: accountId }).countDocuments();

        let _totalProfit = 0, _totalLoss = 0, _averagePnl = 0, _maxProfit = 0, _maxLoss = 0, _minProfit = 0, _minLoss = 0, _totalFees = 0, _avgProfit = 0, _avgLoss = 0, _totalWins = 0, _totalLosses = 0, _winDays = 0, _lossDays = 0, _netDailyPnl = 0, _convWins, _convLoss;

        const result = await TradeStats.aggregate([
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

        const getMinProfit = await TradeStats.aggregate([
            {
                $match: {
                    NetProfit: { $ne: 0 },
                }
            },
            {
                $group: {
                    _id: null,
                    minProfit: { $min: '$NetProfit' },
                }
            }
        ]);

        const getMinLoss = await TradeStats.aggregate([
            {
                $match: {
                    NetLoss: { $ne: 0 },
                }
            },
            {
                $group: {
                    _id: null,
                    minLoss: { $max: '$NetLoss' },
                }
            }
        ]);

        const getDays = await TradeJournal.aggregate([
            {
                $group: {
                    _id: null,
                    totalWinDays: { $sum: { $cond: [{ $gt: ['$TotalNetPnL', 0] }, 1, 0,], }, },
                    totalLossDays: { $sum: { $cond: [{ $lt: ['$TotalNetPnL', 0] }, 1, 0,], }, },
                    netDailyPnl: { $avg: '$TotalNetPnL' },
                },
            },
        ]);

        const getConsecutive = await TradeStats.aggregate([
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
        
        if (result.length > 0 && getMinProfit.length > 0 && getMinLoss.length > 0 && getDays.length > 0 && getConsecutive.length > 0) {
            // Extract the fields from the result
            const { totalProfit, totalLoss, averagePnl, maxProfit, maxLoss, totalFees, avgProfit, avgLoss, countWin, countLoss } = result[0];

            const { minProfit } = getMinProfit[0];
            const { minLoss } = getMinLoss[0];
            const { totalWinDays, totalLossDays, netDailyPnl } = getDays[0];
            const { maxWinStreak, maxLossStreak } = getConsecutive[0].maxStreaks;

            // Update the local variables with the values from the database
            _totalProfit = totalProfit;
            _totalLoss = totalLoss;
            _averagePnl = averagePnl.toFixed(2);
            _maxProfit = maxProfit;
            _minProfit = minProfit;
            _minLoss = minLoss;
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

        const _totalRevenue = _tradeCount === 0 ? 0 : parseFloat(TotalBalance).toFixed(2);
        const _totalPnl = _tradeCount === 0 ? 0 : parseInt((TotalBalance - InitialBalance));
        const _Winrate = _tradeCount === 0 ? 0 : parseFloat((_totalWins / _tradeCount) * 100).toFixed(2);
        const _roi = parseFloat((TotalBalance - InitialBalance) / InitialBalance * 100).toFixed(2);

        const _totalRR = Math.abs(((_totalProfit / InitialBalance) * 100) / ((_totalLoss / InitialBalance) * 100)).toFixed(2);
        const _grossPnl = (_totalPnl + _totalFees).toFixed(2);
        const _profitFactor = Math.abs((_totalProfit / _totalLoss)).toFixed(2);

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
            TimeAllTrades: 0, //TODO :- To be calculated
            TimeWinTrades: 0, //TODO :- To be calculated
            TimeLossTrades: 0, //TODO :- To be calculated
            OpenedTrades: 0, //TODO :- To be calculated
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