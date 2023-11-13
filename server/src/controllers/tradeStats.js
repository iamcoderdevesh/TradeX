import TradeStats from "../models/tradeStats.js";

/* Inserting Additional Info in TradeAddDetails */
export const AddTradeStats = async (req, res, next) => {

    try {
        const { TradeId, AccountId, UserId, Stats, EntryDate } = req.body;
        const { tradeStatus, netProfit, netLoss, netPnL, netRoi, grossPnL, totalFees, tradeRisk, riskReward } = Stats;

        // Find the last Id from Collection. If record does'nt exist, start with 1, otherwise increment the last Id
        let lastId = await TradeStats.findOne().sort('-TradeStatsId');
        const TradeStatsId = lastId ? lastId.TradeStatsId + 1 : 1;

        //Date Time Reset
        const _tradeDate = new Date(EntryDate);
        _tradeDate.setHours(0, 0, 0, 0);

        const newStats = new TradeStats({
            TradeStatsId,
            TradeStatus: tradeStatus,
            NetProfit: netProfit,
            NetLoss: netLoss,
            NetPnL: netPnL,
            NetRoi: netRoi,
            TotalFees: totalFees,
            GrossPnL: grossPnL,
            TradeRisk: tradeRisk,
            RiskReward: riskReward,
            TradeDate: _tradeDate,
            TradeId,
            AccountId,
            UserId,
            CreatedBy: UserId,
        });

        await newStats.save();
        next();
        // res.status(201).send("Trade Added Successfully!!!");

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};