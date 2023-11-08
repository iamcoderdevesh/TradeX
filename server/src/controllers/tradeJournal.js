import TradeJournal from "../models/tradeJournal.js";
import { CalculateHandleJournal } from "../utils/calculate.js";

/* Inserting Data in TradeJournal */
export const AddTradeJournal = async (req, res, next) => {

    try {
        const { TradeId, AccountId, UserId, Stats, EntryDate } = req.body;

        await CalculateHandleJournal(TradeId, UserId, AccountId, Stats, EntryDate);
        res.status(201).send("Trade Added Successfully!!!");

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};