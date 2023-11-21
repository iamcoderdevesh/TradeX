import TradeJournal from "../models/tradeJournal.js";
import { CalculateHandleJournal } from "../utils/calculate.js";
import { DateRangeFilter, excludeFields } from "../utils/general.js";
import { getTradeData } from "./tradeDetail.js";

/* Inserting Data in TradeJournal */
export const AddTradeJournal = async (req, res) => {
    const { TradeId, AccountId, UserId, Stats, EntryDate, TradeState } = req.body;

    await CalculateHandleJournal(TradeId, UserId, AccountId, Stats, EntryDate);
    res.status(201).send("Trade " + TradeState + " Successfully!!!");
};

export const GetJournalDetails = async (req, res) => {
    const { TradeDate } = req.body;
    let FilterName = "JournalDate";

    if (TradeDate) req.body.fromDate = new Date(TradeDate);
    const tradeFilter = DateRangeFilter(req, FilterName);
    req.body.fromDate = undefined; //Undefined the FromDate for further code to execute without date range

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
        res.status(200).json(responseJournal);
    }
    else {
        return res.status(404).send(`No Data Found`);
    }

}

