import { validationResult } from 'express-validator';
import TradeDetails from "../models/tradeDetails.js";
import TradeAddDetails from '../models/tradeAddDetails.js';
import { CalculateHandleJournal, CalculateTradeStats } from '../utils/calculate.js';
import TradeStats from '../models/tradeStats.js';
import TradeJournal from '../models/tradeJournal.js';
import { DateRangeFilter } from '../utils/general.js';
import Accounts from '../models/accounts.js';

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

            const accountDetails = await Accounts.findOne({ AccountId });

            if (!accountDetails) return res.status(400).json({
                success: false,
                error: "Account Not Found! Please go to Settings and create account"
            });

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
                    res.status(400).json({
                        success: false,
                        error: "Oops Something Went! Unable to Update Trade"
                    });
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
                    res.status(400).json({
                        success: true,
                        error: "Oops Something Went! Unable to Insert Trade"
                    });
                }
                else {
                    req.body.TradeId = trade.TradeId;
                    req.body.TradeState = false; //If false means new trade added
                }
            }

            //If any field had the value then insert data in TradeAddDetails
            if (EntryReason || ExitReason || Emotions || MarketConditions || AdditionalInformation) {
                if (!AddUpdateTradeAddDetails(req)) {
                    res.status(400).json({
                        success: true,
                        error: "Oops Something Went Wrong! Unable to Update Trade"
                    });
                }
            }

            //Calculate Stats only if tradeStatus is Closed
            if (TradeStatus === "Closed") {
                req.body.Stats = await CalculateTradeStats(Action, EntryPrice, ExitPrice, StopLoss, Quantity, Fees, AccountId);
                next();
            }
            else {
                return res.status(201).json({
                    success: true,
                    message: "Trade " + (req.body?.TradeState ? "Updated" : "Added") + " Successfully!!!"
                });
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

    const { id: tradeId } = req.query;

    let FilterName = "EntryDate";
    const tradeFilter = DateRangeFilter(req, FilterName);

    //Filter for fetching TradeDetails to show in Daily Trade Journal.
    const { TradeId } = req.body;
    if (TradeId) tradeFilter.TradeId = { $in: TradeId };

    if (tradeId) tradeFilter.TradeId = parseInt(tradeId);

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
                "TradeName": 1,
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
                "GrossPnL": "$TradeStats.GrossPnL",
                "NetRoi": "$TradeStats.NetRoi",
                "Fees": "$TradeStats.TotalFees",
                "TradeRisk": "$TradeStats.TradeRisk",
                "RiskReward": "$TradeStats.RiskReward",
            }
        },
    ]).sort({ EntryDate: 1 });

    //Return All Trades to GetTradeJournal function.
    if (TradeId) {
        return getTrade;
    }
    else {

        let previousTrade, nextTrade;
        if (tradeId) {
            //Deleting tradeId from filter because we want prev & next tradeId
            delete tradeFilter.TradeId;

            //Below code is for getting previous & next tradeId based on actual tradeId using index
            const tradeDetail = await TradeDetails.find(tradeFilter).sort({ EntryDate: 1 });
            const currentIndex = tradeDetail.findIndex(trade => trade.TradeId === parseInt(tradeId));
            previousTrade = currentIndex > 0 ? tradeDetail[currentIndex - 1] : null;
            nextTrade = currentIndex < tradeDetail.length - 1 ? tradeDetail[currentIndex + 1] : null;
        }

        return res.status(200).json({
            success: true,
            tradeDetails: tradeId ? {
                ...getTrade[0],
                previousTradeId: previousTrade?.TradeId,
                nextTradeId: nextTrade?.TradeId
            } : getTrade,
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
                "AccountId": 1,
                "EntryReason": "$TradeAddDetails.EntryReason",
                "ExitReason": "$TradeAddDetails.ExitReason",
                "Emotions": "$TradeAddDetails.Emotions",
                "MarketCondition": "$TradeAddDetails.MarketCondition",
                "AdditionalInfo": "$TradeAddDetails.TradeAddInfo",
            }
        },
        {
            $addFields: {
                Account: "$AccountId"
            }
        },
        {
            $project: {
                "AccountId": 0
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
                "TradeId": 1,
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
    //Fetching Data Updating the TradeStats & Journal
    const tradeDetail = await TradeDetails.findOne(tradeFilter);
    const tradeStats = await TradeStats.findOne(tradeFilter);

    const prevNetPnl = parseInt(tradeStats?.NetPnL);
    const updatedNetPnl = prevNetPnl >= 0 ? -prevNetPnl : Math.abs(prevNetPnl);

    await TradeDetails.deleteMany(tradeFilter);
    await TradeAddDetails.deleteMany(tradeFilter);
    await TradeStats.deleteMany(tradeFilter);
    
    if (TradeId) {
        //Seaching TradeId's to Update/Delete TradeJournal
        delete tradeFilter.TradeId;
        const journal = await TradeJournal.findOne({ "TradeIds": TradeId });
        const TradeIds = journal?.TradeIds;

        //If there is only one TradeId Delete the tradeJournal
        if (TradeIds?.length === 1) {
            // Update the Account's Collection
            const account = await Accounts.findOne({ AccountId });
            const totalBalance = parseInt(account?.TotalBalance);
            await Accounts.updateOne(
                { AccountId },
                {
                    TotalBalance: (totalBalance + updatedNetPnl)
                }
            );
            await TradeJournal.deleteOne({ ...tradeFilter, "TradeIds": TradeId });
        }

        //Else Update it
        else {
            const updateJournal = await TradeJournal.updateOne({ ...tradeFilter, "TradeIds": TradeId }, { $pull: { TradeIds: TradeId } });

            if (updateJournal) {
                const currentStats = { netPnL: 0 };
                await CalculateHandleJournal(TradeId, UserId, AccountId, currentStats, tradeDetail?.EntryDate, true, updatedNetPnl);
            }
        }
        return res.status(200).send({
            success: true,
            message: "Trade Deleted Successfully!!!"
        });
    }
    else {
        await TradeJournal.deleteMany(tradeFilter);
        return true;
    }

}