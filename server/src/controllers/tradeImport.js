import { validationResult } from 'express-validator';
import TradeImport from "../models/tradeImports.js";

/* Creating Account */
export const ImportTrades = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    else {
        try {
            const { UserId, Broker, AccountName, ImportDesc, AccountId } = req.body;

            const ImportId = Math.floor(Math.random() * 10000);
            const TotalTrades = 80;
            const Import = new TradeImport({
                ImportId,
                Broker,
                AccountName,
                // ImportFile,
                ImportDesc,
                TotalTrades,
                AccountId,
                UserId,
                CreatedBy: UserId,
            });

            await Import.save();
            res.status(201).send("Trade Imported Successfully!!!");

        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
};