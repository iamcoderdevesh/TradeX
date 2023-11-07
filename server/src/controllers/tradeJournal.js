import TradeJournal from "../models/tradeJournal.js";

/* Inserting Additional Info in TradeAddDetails */
export const CreateTag = async (req, res, next) => {

    try {
        const { TradeId, AccountId, UserId } = req.body;

        const JournalId = Math.floor(Math.random() * 10000);
        const newTradeJournal = new TradeJournal({
            JournalId,
            JournalDate,
            TotalNetPnL,
            TotalTrades,
            TotalWins,
            TotalLoss,
            Winrate,
            TotalFees,
            TotalGrossPnL,
            TotalRR,
            NetRevenue,
            GrossRevenue,
            TotalRevenue,
            TradeId,
            AccountId,
            UserId,
            CreatedBy: UserId,
        });

        await newTradeJournal.save();
        next();
        // res.status(201).send("Tag Created Successfully!!!");

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};