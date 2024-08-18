import TradeJournal from "../models/tradeJournal.js";
import { CalculateHandleJournal } from "../utils/calculate.js";
import { DateRangeFilter, excludeFields } from "../utils/general.js";
import { getTradeData } from "./tradeDetail.js";

/* Inserting Data in TradeJournal */
export const AddTradeJournal = async (req, res) => {
    const { TradeId = 0, AccountId, UserId, Stats, EntryDate, TradeState, prevNetPnl, IsImport = false } = req.body;
    await CalculateHandleJournal(TradeId, UserId, AccountId, Stats, EntryDate, TradeState, prevNetPnl);
    if(IsImport) {
        return true;
    }
    else {
        return res.status(201).json({
            success: true,
            message: "Trade " + (TradeState ? "Updated" : "Added") + " Successfully!!!"
        });
    }

};

export const GetJournalDetails = async (req, res) => {
    const { TradeDate } = req.query;
    let FilterName = "JournalDate";

    if (TradeDate) {
        const tradeDate = new Date(TradeDate);
        tradeDate.setDate(tradeDate.getDate() - 1);
        req.query.fromDate = tradeDate;
    }
    const tradeFilter = DateRangeFilter(req, FilterName);
    req.query.fromDate = undefined; //Undefined the FromDate for further code to execute without date range

    const fetchJoinJournalTradeDetails = async (journal) => {
        req.body.TradeId = journal.TradeIds;
        const tradeDetail = await getTradeData(req, res);

        let journalObj = { ...journal.toObject() }; //Using rest/spread operator for deleting tradeId's
        delete journalObj.TradeIds;
        journalObj.TradeDetails = tradeDetail; // Add TradeDetails to the journal object
        return journalObj;
    }

    //If Condition for fetching date specific single record for pnl calendar popup
    if (TradeDate) {
        let journalDetails = [];
        const journal = await TradeJournal.findOne(tradeFilter).select(excludeFields());
        if(journal) journalDetails = await fetchJoinJournalTradeDetails(journal);

        return res.status(200).json({
            success: true,
            journalDetails
        });
    }
    //Else for fetching all records for journal
    else {
        let journalDetails = [];
        const JournalTrade = await TradeJournal.find(tradeFilter).select(excludeFields()).sort({ JournalDate: 1 });

        if (JournalTrade) {
            for (const journal of JournalTrade) {
                const journalDetail = await fetchJoinJournalTradeDetails(journal);
                journalDetails.push(journalDetail); // Add the journal object to the response array
            }
            return res.status(200).json({
                success: true,
                journalDetails
            });
        }
        else {
            return res.status(200).json({
                success: true,
                journalDetails
            });
        }
    }

};

export const GetJournalForCalendar = async (req, res) => {

    req.query.fromDate = undefined;
    let FilterName = "JournalDate";
    const tradeFilter = DateRangeFilter(req, FilterName);
    const calendarDetails = await TradeJournal.find(tradeFilter).select('-_id JournalDate TradeStatus TotalNetPnL');

    res.status(200).json({
        success: true,
        calendarDetails
    });
};