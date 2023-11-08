import Accounts from "../models/accounts.js";
import TradeStats from "../models/tradeStats.js";
import TradeJournal from "../models/tradeJournal.js";

export const CalculateTradeStats = async (Action, EntryPrice, ExitPrice, StopLoss, Quantity, Fees, AccountId) => {

    const account = await Accounts.findOne({ AccountId });
    const _capital = account.TotalBalance;

    const _grossPnL = parseFloat((ExitPrice - EntryPrice) * Quantity).toFixed(2);
    const _netPnL = parseFloat((_grossPnL - Fees).toFixed(2));
    const _tradeRisk = parseFloat((EntryPrice - StopLoss) * Quantity).toFixed(2);
    const _tradeStatus = EntryPrice < ExitPrice ? (Action === 'Buy' ? 'WIN' : 'LOSS') : (EntryPrice > ExitPrice ? (Action === 'Sell' ? 'WIN' : 'LOSS') : 'BREAKEVEN');
    const _netProfit = _tradeStatus === 'WIN' ? _netPnL : 0;
    const _netLoss = _tradeStatus === 'LOSS' ? _netPnL : 0;

    return {
        tradeStatus: _tradeStatus,
        netProfit: _netProfit,
        netLoss: _netLoss,
        netPnL: _netPnL,
        netRoi: parseFloat((_netPnL / _capital * 100).toFixed(2)),
        grossPnL: parseFloat(_grossPnL).toFixed(2),
        totalFees: Fees,
        tradeRisk: _tradeRisk,
        riskReward: parseFloat((_grossPnL / _tradeRisk).toFixed(2))
    };
}

export const CalculateHandleJournal = async (TradeId, UserId, AccountId, currentStats, todaysDate) => {

    // Fetch account details
    const account = await Accounts.findOne({ AccountId });
    const _capital = account.TotalBalance;

    // Initialize variables
    const { tradeStatus, netPnL, grossPnL, riskReward, totalFees } = currentStats;

    let _totalNetPnL = netPnL, _totalTrades = 1, _totalWins = tradeStatus === 'WIN' ? 1 : 0, _totalLoss = tradeStatus === 'LOSS' ? 1 : 0, _winrate = 0, _totalFees = totalFees, _totalGrossPnL = grossPnL, _totalRR = riskReward, _netRevenue = netPnL, _grossRevenue = (totalFees + _netRevenue + _capital), _totalRevenue = _netRevenue + _capital;

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

    if (getJournal !== null) {

        _totalNetPnL = 0, _totalTrades = 0, _totalWins = 0, _totalLoss = 0, _winrate = 0, _totalFees = 0, _totalGrossPnL = 0, _totalRR = 0, _netRevenue = 0, _grossRevenue = 0, _totalRevenue = 0;

        const _journalDate = new Date(getJournal.JournalDate).toLocaleDateString();

        // If a journal entry exists for today, update it. Otherwise, create a new entry.
        if (_journalDate === end.toLocaleDateString()) {
            
            end.setHours(23, 59, 59, 999); // Set the time to the end of the day
            start = new Date(end);
            start.setDate(end.getDate() - 1);
            start.setHours(0, 0, 0, 0); // Set the time to the start of the day

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
                _totalGrossPnL += trade.GrossPnL;
                _totalRR += trade.RiskReward;

                if (trade.TradeStatus === 'WIN') {
                    _totalWins++;
                    _totalNetPnL += trade.NetPnL;
                } else {
                    _totalLoss++;
                    _totalNetPnL -= trade.NetPnL;
                }
            });

            //Get Revenue from TradeJournal
            _totalRevenue = getJournal.TotalRevenue;

            // Calculate additional fields
            _winrate = (_totalWins / _totalTrades) * 100;
            _netRevenue = (_capital + _totalNetPnL);
            _grossRevenue = _totalGrossPnL + _capital;
            _totalRevenue += netPnL;

            // Update today's journal entry
            await TradeJournal.updateOne(
                { JournalDate: { $gte: start, $lt: end } },
                {
                    TotalNetPnL: _totalNetPnL,
                    TotalTrades: _totalTrades,
                    TotalWins: _totalWins,
                    TotalLoss: _totalLoss,
                    Winrate: _winrate,
                    TotalFees: _totalFees,
                    TotalGrossPnL: _totalGrossPnL,
                    TotalRR: _totalRR,
                    NetRevenue: _netRevenue,
                    GrossRevenue: _grossRevenue,
                    TotalRevenue: _totalRevenue,
                }
            );
        }
    }
    else {
        // Insert a new journal entry for today
        const JournalId = Math.floor(Math.random() * 10000);
        const newJournal = new TradeJournal({
            JournalId: JournalId,
            JournalDate: end,
            TotalNetPnL: _totalNetPnL,
            TotalTrades: _totalTrades,
            TotalWins: _totalWins,
            TotalLoss: _totalLoss,
            Winrate: _winrate,
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
}
