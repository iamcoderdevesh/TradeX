import { validationResult } from 'express-validator';
import TradeDetails from "../models/tradeDetails.js";
import TradeAddDetails from '../models/tradeAddDetails.js';
import { CalculateTradeStats } from '../utils/calculate.js';
import TradeStats from '../models/tradeStats.js';
import TradeJournal from '../models/tradeJournal.js';
import { DateRangeFilter } from '../utils/general.js';

/* Inserting/Updating TradeDetails */
export const AddUpdateTrade = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    else {
        try {
            const { Market, Broker, Setup, TradeStatus, Action, Symbol, EntryDate, ExitDate,
                EntryPrice, ExitPrice, StopLoss, Quantity, EntryReason, ExitReason,
                Emotions, MarketConditions, AdditionalInformation, UserId, AccountId, TradeId = 0 } = req.body;
            const Fees = 50.00;

            //Checking the records exists or not
            const tradeDetails = await TradeDetails.findOne({ UserId, AccountId, TradeId });
            const TradeName = Symbol + " " + Action;

            //If record exists Update Trade
            if (tradeDetails) {
                const updateTrade = await TradeDetails.findOneAndUpdate(
                    { UserId, AccountId, TradeId },
                    { TradeName, Market, Broker, Setup, TradeStatus, Action, Symbol, EntryDate, ExitDate, EntryPrice, ExitPrice, StopLoss, Quantity, AccountId, UpdatedBy: UserId },
                    { new: true }
                );

                if (!updateTrade) {
                    res.status(400).json({ error: "Oops Something Went! Unable to Update Trade" });
                }
                else {
                    req.body.TradeState = true; //If true means updated
                }
            }
            //Else Insert New Trade
            else {
                // Find the last Id from Collection. If record does'nt exist, start with 1, otherwise increment the last Id
                let lastId = await TradeDetails.findOne().sort('-TradeId');
                const TradeId = lastId ? lastId.TradeId + 1 : 1;

                const newTrade = new TradeDetails({ TradeId, TradeName, Market, Broker, Setup, TradeStatus, Action, Symbol, EntryDate, ExitDate, EntryPrice, ExitPrice, StopLoss, Quantity, AccountId, UserId, CreatedBy: UserId });

                const trade = await newTrade.save();
                if (!trade) {
                    res.status(400).json({ error: "Oops Something Went! Unable to Insert Trade" });
                }
                else {
                    req.body.TradeId = trade.TradeId;
                    req.body.TradeState = false; //If false means new trade added
                }
            }

            //If any field had the value then insert data in TradeAddDetails
            if (EntryReason || ExitReason || Emotions || MarketConditions || AdditionalInformation) {
                if (!AddUpdateTradeAddDetails(req)) {
                    res.status(400).json({ error: "Oops Something Went Wrong! Unable to Update Trade" });
                }
            }

            //Calculate Stats only if tradeStatus is Closed
            if (TradeStatus === "Closed") {
                req.body.Stats = await CalculateTradeStats(Action, EntryPrice, ExitPrice, StopLoss, Quantity, Fees, AccountId);
                next();
            }
            else {
                res.status(201).send("Trade " + (req.body?.TradeState ? "Updated" : "Added") + " Successfully!!!");
            }
        }
        catch (err) {
            return;
        }
    }
};

/* Inserting/Updating TradeAddDetails */
const AddUpdateTradeAddDetails = async (req) => {
    const { TradeId, UserId, AccountId, EntryReason, ExitReason, Emotions, MarketCondition, TradeAddInfo } = req.body;

    const tradeAddDetails = await TradeAddDetails.findOne({ UserId, AccountId, TradeId });
    if (tradeAddDetails) {
        const updateTrade = await TradeAddDetails.findOneAndUpdate(
            { UserId, AccountId, TradeId },
            { EntryReason, ExitReason, Emotions, MarketCondition, TradeAddInfo, AccountId, UpdatedBy: UserId },
            { new: true }
        );

        if (updateTrade) {
            return updateTrade;
        }
    }
    else {
        // Find the last Id from Collection. If record does'nt exist, start with 1, otherwise increment the last Id
        let lastId = await TradeAddDetails.findOne().sort('-TradeAddId');
        const TradeAddId = lastId ? lastId.TradeAddId + 1 : 1;

        const newTrade = new TradeAddDetails({ TradeAddId, EntryReason, ExitReason, Emotions, MarketCondition, TradeAddInfo, TradeId, AccountId, UserId, CreatedBy: UserId });

        const tradeDetails = await newTrade.save();
        if (tradeDetails) {
            return tradeDetails;
        }
    }
};

/* Getting all Trade Data & Statistics */
export const getTradeData = async (req, res) => {

    let FilterName = "EntryDate";
    const tradeFilter = DateRangeFilter(req, FilterName);

    //Filter for fetching TradeDetails to show in Daily Trade Journal.
    const { TradeId: tradeId } = req.body;
    if (tradeId) tradeFilter.TradeId = { $in: tradeId };

    const getTrade = await TradeDetails.aggregate([
        { $match: tradeFilter },
        {
            $lookup: {
                from: "TradeAddDetails",
                localField: "TradeId",
                foreignField: "TradeId",
                as: "TradeAddDetails",
            },
        },
        {
            $lookup: {
                from: "TradeStats",
                localField: "TradeId",
                foreignField: "TradeId",
                as: "TradeStats"
            },
        },
        { $unwind: { path: "$TradeAddDetails", preserveNullAndEmptyArrays: true } },
        { $unwind: { path: "$TradeStats", preserveNullAndEmptyArrays: true } },
        {
            $project: {
                "_id": 0,
                "TradeId": 1,
                "Symbol": 1,
                "EntryDate": 1,
                "ExitDate": 1,
                "Action": 1,
                "EntryPrice": 1,
                "ExitPrice": 1,
                "StopLoss": 1,
                "Quantity": 1,
                "Setup": 1,
                "EntryReason": "$TradeAddDetails.EntryReason",
                "ExitReason": "$TradeAddDetails.ExitReason",
                "MarketCondition": "$TradeAddDetails.MarketCondition",
                "Emotions": "$TradeAddDetails.Emotions",
                "AdditionalInfo": "$TradeAddDetails.TradeAddInfo",
                "TradeStatus": "$TradeStats.TradeStatus",
                "NetPnL": "$TradeStats.NetPnL",
                "NetRoi": "$TradeStats.NetRoi",
            }
        }
    ]);

    //Return All Trades to GetTradeJournal function.
    if (tradeId) {
        return getTrade;
    }
    else {
        return res.status(200).json({
            success: true,
            tradeDetails: getTrade
        });
    }
};

/* Getting all Trade Data for Update Operation */
export const getTradeDetails = async (req, res) => {

    //For update operation filter by TradeId
    const { UserId } = req.body;
    const TradeId = parseInt(req.params?.id || 0);

    const getTrade = await TradeDetails.aggregate([
        { $match: { UserId, TradeId } },
        {
            $lookup: {
                from: "TradeAddDetails",
                localField: "TradeId",
                foreignField: "TradeId",
                as: "TradeAddDetails",
            },
        },
        { $unwind: { path: "$TradeAddDetails", preserveNullAndEmptyArrays: true } },
        {
            $project: {
                "_id": 0,
                "Market": 1,
                "Broker": 1,
                "Setup": 1,
                "TradeStatus": 1,
                "Action": 1,
                "Symbol": 1,
                "EntryDate": 1,
                "ExitDate": 1,
                "EntryPrice": 1,
                "ExitPrice": 1,
                "StopLoss": 1,
                "Quantity": 1,
                "EntryReason": "$TradeAddDetails.EntryReason",
                "ExitReason": "$TradeAddDetails.ExitReason",
                "Emotions": "$TradeAddDetails.Emotions",
                "MarketCondition": "$TradeAddDetails.MarketCondition",
                "AdditionalInfo": "$TradeAddDetails.TradeAddInfo",
            }
        }
    ]);

    return res.status(200).json({
        success: true,
        tradeDetails: { ...getTrade[0] }
    });
};

/* For Dashboard Fetch Recent Trade */
export const GetRecentTrade = async (req, res) => {
    const getTrade = await TradeDetails.aggregate([
        { $match: DateRangeFilter(req, "EntryDate") },
        {
            $lookup: {
                from: "TradeStats",
                localField: "TradeId",
                foreignField: "TradeId",
                as: "TradeStats"
            },
        },
        { $sort: { _id: -1 } },
        { $limit: 4 },
        { $unwind: { path: "$TradeStats", preserveNullAndEmptyArrays: true } },
        {
            $project: {
                "_id": 0,
                "Symbol": 1,
                "EntryDate": 1,
                "ExitDate": 1,
                "Action": 1,
                "TradeStatus": "$TradeStats.TradeStatus",
                "NetPnL": "$TradeStats.NetPnL",
                "NetRoi": "$TradeStats.NetRoi",
            }
        }
    ]);
    return res.status(200).json({
        success: true,
        tradeDetails: getTrade
    });
}

/* Deleting Trade */
export const DeleteTrades = async (req, res) => {
    const { AccountId, UserId, TradeId } = req.body;

    const tradeFilter = { UserId, AccountId };

    /* If TradeId Exists delete single trade */
    if (TradeId) {
        tradeFilter.TradeId = TradeId;
    }

    /* Else Delete all Trade */
    //Checking the records exists or not.
    const tradeDetail = await TradeDetails.find(tradeFilter);
    if (tradeDetail) {
        const deleteTrade = await TradeDetails.deleteMany(tradeFilter);
        const deleteTradeAdd = await TradeAddDetails.deleteMany(tradeFilter);
        const deleteTradeStat = await TradeStats.deleteMany(tradeFilter);
        const deleteTradeJournal = await TradeJournal.deleteMany(tradeFilter);

        if (deleteTrade.deletedCount > 0 && deleteTradeAdd.deletedCount > 0 && deleteTradeStat.deletedCount > 0 && deleteTradeJournal.deletedCount > 0) {
            if (TradeId) return res.status(200).send("Trade Deleted Successfully");
            return true;
        }
        else {
            return false;
        }
    }
    else {
        return true;
    }
}