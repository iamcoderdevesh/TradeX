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

            const TradeAddId = Math.floor(Math.random() * 10000);
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