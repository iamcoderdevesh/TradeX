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

/* Comparing the Input Date With JournalDateTime Array for preventing duplicate Entries */
export const getJournalDateDetails = async (date) => {

    // Fetch today's journal entry if it exists
    const getJournal = await TradeJournal.find({
        JournalDateTime: date
    });

    // Chek if a journal entry exists for today
    if (getJournal.length > 0) {
        return getJournal;
    }
    else {
        return null;
    }
}