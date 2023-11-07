import TradeStats from "../models/tradeStats.js";

/* Inserting Additional Info in TradeAddDetails */
export const AddTradeStats = async (req, res) => {

    try {
        const { TradeId, AccountId, UserId, Stats } = req.body;
        const { tradeStatus, netProfit, netLoss, netPnL, netRoi, grossPnL, tradeRisk, riskReward } = Stats;

        const TradeStatsId = Math.floor(Math.random() * 10000);
        const newStats = new TradeStats({
            TradeStatsId,
            TradeStatus: tradeStatus,
            NetProfit: netProfit,
            NetLoss: netLoss,
            NetPnL: netPnL,
            NetRoi: netRoi,
            TotalFees: 0,
            GrossPnL: grossPnL,
            TradeRisk: tradeRisk,
            RiskReward: riskReward,
            TradeId,
            AccountId,
            UserId,
            CreatedBy: UserId,
        });

        await newStats.save();
        // next();
        res.status(201).send("Trade Added Successfully!!!");

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};