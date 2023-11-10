import { validationResult } from 'express-validator';
import TradeAddDetails from "../models/tradeAddDetails.js";

/* Inserting Additional Info in TradeAddDetails */
export const AddTradeDetail = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    else {
        try {
            const { EntryReason, ExitReason, Emotions, MarketCondition, TradeAddInfo, TradeId, AccountId, UserId } = req.body;

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
            next();
            // res.status(201).send("Tag Created Successfully!!!");

        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
};