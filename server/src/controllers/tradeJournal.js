import TradeJournal from "../models/tradeJournal.js";
import { CalculateHandleJournal } from "../utils/calculate.js";
import { DateRangeFilter, excludeFields } from "../utils/general.js";
import { getTradeData } from "./tradeDetail.js";

/* Inserting Data in TradeJournal */
export const AddTradeJournal = async (req, res) => {
    const { TradeId = 0, AccountId, UserId, Stats, EntryDate, TradeState, prevNetPnl } = req.body;
    await CalculateHandleJournal(TradeId, UserId, AccountId, Stats, EntryDate, TradeState, prevNetPnl);
    return res.status(201).json({
        success: true,
        message: "Trade " + (TradeState ? "Updated" : "Added") + " Successfully!!!"
    });
};

export const GetJournalDetails = async (req, res) => {
    const { TradeDate } = req.query;
    let FilterName = "JournalDate";

    if (TradeDate) req.query.fromDate = new Date(TradeDate);
    const tradeFilter = DateRangeFilter(req, FilterName);
    req.query.fromDate = undefined; //Undefined the FromDate for further code to execute without date range

    const JournalTrade = await TradeJournal.find(tradeFilter)
        .select(excludeFields());

    let journalDetails = [];
    if (JournalTrade) {
        for (const journal of JournalTrade) {
            req.body.TradeId = journal.TradeIds;
            const tradeDetail = await getTradeData(req, res);
    
            let journalObj = {...journal.toObject()}; //Using rest/spread operator for deleting tradeId's
            delete journalObj.TradeIds;
            journalObj.TradeDetails = tradeDetail; // Add TradeDetails to the journal object
            journalDetails.push(journalObj); // Add the journal object to the response array
        }
        res.status(200).json({
            success: true,
            journalDetails
        });
    }
    else {
        return res.status(404).send(`No Data Found`);
    }

};

export const GetJournalForCalendar = async (req, res) => {

    req.body.fromDate = undefined;
    let FilterName = "JournalDate";
    const tradeFilter = DateRangeFilter(req, FilterName);
    const JournalTrade = await TradeJournal.find(tradeFilter).select('-_id JournalDate TradeStatus TotalNetPnL');

    res.status(200).json(JournalTrade);
};