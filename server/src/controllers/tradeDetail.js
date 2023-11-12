import { validationResult } from 'express-validator';
import TradeDetails from "../models/tradeDetails.js";
import TradeAddDetails from '../models/tradeAddDetails.js';
import { CalculateTradeStats } from '../utils/calculate.js';

/* Creating Trade */
export const AddTrade = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    else {
        try {
            const { TradeName, Market, Broker, Setup, TradeStatus, Action, Symbol, EntryDate, ExitDate, EntryPrice, ExitPrice, StopLoss, Quantity, isAdd, UserId, AccountId } = req.body;

            // Find the last Id from Collection. If record does'nt exist, start with 1, otherwise increment the last Id
            let lastId = await TradeDetails.findOne().sort('-TradeId');
            const TradeId = lastId ? lastId.TradeId + 1 : 1;

            const Fees = 50.00;
            const newTrade = new TradeDetails({
                TradeId,
                TradeName,
                Market,
                Broker,
                Setup,
                TradeStatus,
                Action,
                Symbol,
                EntryDate,
                ExitDate,
                EntryPrice,
                ExitPrice,
                StopLoss,
                Quantity,
                AccountId,
                UserId,
                CreatedBy: UserId,
            });

            const trade = await newTrade.save();
            req.body.TradeId = trade.TradeId;
            req.body.Stats = await CalculateTradeStats(Action, EntryPrice, ExitPrice, StopLoss, Quantity, Fees, AccountId);

            //TradeAddDetails
            //If isAdd Boolean is true then insert data in TradeAddDetails
            if (isAdd) {
                const { EntryReason, ExitReason, Emotions, MarketCondition, TradeAddInfo } = req.body;

                // Find the last Id from Collection. If record does'nt exist, start with 1, otherwise increment the last Id
                let lastId = await TradeAddDetails.findOne().sort('-TradeAddId');
                const TradeAddId = lastId ? lastId.TradeAddId + 1 : 1;

                const newTrade = new TradeAddDetails({
                    TradeAddId,
                    EntryReason,
                    ExitReason,
                    Emotions,
                    MarketCondition,
                    TradeAddInfo,
                    TradeId,
                    AccountId,
                    UserId,
                    CreatedBy: UserId,
                });

                await newTrade.save();
            }
            //
            next();

        } catch (err) {
            res.status(500).json({ error: err.message });
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
                    "TradeAddDetails.__v": 0
                }
            }
        ]);
        res.status(200).json(getTrade);
    }
}