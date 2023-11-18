import TradeJournal from "../models/tradeJournal.js";
import { CalculateHandleJournal } from "../utils/calculate.js";
import { DateRangeFilter, excludeFields } from "../utils/general.js";

/* Inserting Data in TradeJournal */
export const AddTradeJournal = async (req, res) => {
    try {
        const { TradeId, AccountId, UserId, Stats, EntryDate, TradeState } = req.body;

        await CalculateHandleJournal(TradeId, UserId, AccountId, Stats, EntryDate);
        res.status(201).send("Trade " + TradeState + " Successfully!!!");

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

/* Getting the Daily Journal*/
export const getJournalData = async (req, res) => {
    let FilterName = "JournalDate";
    const tradeFilter = DateRangeFilter(req, FilterName);

    const JounralTrade = await TradeJournal.find(tradeFilter)
        .select(excludeFields());
    res.status(200).json(JounralTrade);
}