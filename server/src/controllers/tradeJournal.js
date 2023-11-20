import TradeJournal from "../models/tradeJournal.js";
import { CalculateHandleJournal } from "../utils/calculate.js";
import { DateRangeFilter, excludeFields } from "../utils/general.js";
import { getTradeData } from "./tradeDetail.js";

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

export const getJournalData = async (req, res) => {
    try {
        let FilterName = "JournalDate";
        const tradeFilter = DateRangeFilter(req, FilterName);

        const JournalTrade = await TradeJournal.find(tradeFilter)
            .select(excludeFields());

        let responseJournal = [];
        if (JournalTrade) {
            for (const journal of JournalTrade) {
                req.body.TradeId = journal.TradeIds;
                const tradeDetail = await getTradeData(req, res);

                let journalObj = journal.toObject(); // Convert the Mongoose document to a plain JavaScript object
                journalObj.TradeDetails = tradeDetail; // Add TradeDetails to the journal object
                responseJournal.push(journalObj); // Add the journal object to the response array
            }
        }

        res.status(200).json(responseJournal);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

