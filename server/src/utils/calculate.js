import Accounts from "../models/accounts.js";

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
        grossPnL: _grossPnL,
        tradeRisk: _tradeRisk,
        riskReward: parseFloat((_grossPnL / _tradeRisk).toFixed(2))
    };
}