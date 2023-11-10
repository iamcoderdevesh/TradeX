import { validationResult } from 'express-validator';
import TradeDetails from "../models/tradeDetails.js";
import { CalculateTradeStats } from '../utils/calculate.js';
import { getJournalDateDetails } from './tradeJournal.js';

/* Creating Trade */
export const AddTrade = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    else {
        try {
            const { TradeName, Market, Broker, Setup, TradeStatus, Action, Symbol, EntryDate, ExitDate, EntryPrice, ExitPrice, StopLoss, Quantity, UserId, AccountId } = req.body;

            //DateTime Validation for Journal
            const getJournal = await getJournalDateDetails(EntryDate);

            if (getJournal !== null) {
                return res.status(400).json({ errors: "Unable to save the trade as there is already an existing trade with the same date and time." });
            }

            const TradeId = Math.floor(Math.random() * 10000);
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
            next();

        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
};