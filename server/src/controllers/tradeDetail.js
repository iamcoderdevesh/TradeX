import { validationResult } from 'express-validator';
import TradeDetails from "../models/tradeDetails.js";
import TradeAddDetails from '../models/tradeAddDetails.js';
import { CalculateTradeStats } from '../utils/calculate.js';

/* Inserting/Updating TradeDetails */
export const AddUpdateTrade = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    else {
        try {
            const { TradeName, Market, Broker, Setup, TradeStatus, Action, Symbol, EntryDate, ExitDate, EntryPrice, ExitPrice, StopLoss, Quantity, isAdd, UserId, AccountId, TradeId = 0 } = req.body;
            const Fees = 50.00;

            //Checking the records exists or not
            const tradeDetails = await TradeDetails.findOne({ UserId, AccountId, TradeId });

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
                    req.body.TradeState = "Updated";
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
                    req.body.TradeState = "Added";
                }
            }

            req.body.Stats = await CalculateTradeStats(Action, EntryPrice, ExitPrice, StopLoss, Quantity, Fees, AccountId);

            //If isAdd Boolean is true then insert data in TradeAddDetails
            if (isAdd) {
                if (!AddUpdateTradeAddDetails(req)) {
                    res.status(400).json({ error: "Oops Something Went! Unable to Update Trade" });
                }
            }
            next();
        } catch (err) {
            res.status(500).json({ error: err.message });
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

/* Getting all Trade Data */
export const getTradeData = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    else {

        const getTrade = await TradeDetails.aggregate([
            { $match: { UserId: req.body.UserId, AccountId: parseInt(req.params.accountId) } },
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
            {
                $project: {
                    "_id": 0,
                    "AccountId": 0,
                    "UserId": 0,
                    "CreatedBy": 0,
                    "UpdatedBy": 0,
                    "createdAt": 0,
                    "updatedAt": 0,
                    "__v": 0,
                    "TradeAddDetails._id": 0,
                    "TradeAddDetails.TradeId": 0,
                    "TradeAddDetails.AccountId": 0,
                    "TradeAddDetails.UserId": 0,
                    "TradeAddDetails.CreatedBy": 0,
                    "TradeAddDetails.UpdatedBy": 0,
                    "TradeAddDetails.createdAt": 0,
                    "TradeAddDetails.updatedAt": 0,
                    "TradeAddDetails.__v": 0,
                    "TradeStats._id": 0,
                    "TradeStats.TradeId": 0,
                    "TradeStats.AccountId": 0,
                    "TradeStats.UserId": 0,
                    "TradeStats.CreatedBy": 0,
                    "TradeStats.UpdatedBy": 0,
                    "TradeStats.createdAt": 0,
                    "TradeStats.updatedAt": 0,
                    "TradeStats.__v": 0,

                }
            }
        ]);
        res.status(200).json(getTrade);
    }
};