import TradeJournal from "../models/tradeJournal.js";
import { CalculateHandleJournal } from "../utils/calculate.js";

/* Inserting Data in TradeJournal */
export const AddTradeJournal = async (req, res) => {
    try {
        const { TradeId, AccountId, UserId, Stats, EntryDate } = req.body;

        await CalculateHandleJournal(TradeId, UserId, AccountId, Stats, EntryDate);
        res.status(201).send("Trade Added Successfully!!!");

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

/* Getting all Trade Data */
export const getJournalData = async (req, res) => {
    const { UserId, AccountId } = req.body;
    const JounralTrade = await TradeJournal.find({ UserId: UserId, AccountId: AccountId });
    res.status(200).json(JounralTrade);
}