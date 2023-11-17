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

            // Find the last Id from Collection. If record does'nt exist, start with 1, otherwise increment the last Id
            let lastId = await TradeImport.findOne().sort('-ImportId');
            const ImportId = lastId ? lastId.ImportId + 1 : 1;

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


/* Deleting TradeImport */
export const DeleteTradeImport = async (req, res) => {

    const { UserId, AccountId, ImportId } = req.body;

    const importFilter = { UserId, AccountId };

    if (ImportId) {
        importFilter.ImportId = ImportId;
    }

    //Checking the records exists or not
    try {
        const tradeImport = await TradeImport.find(importFilter);
        if (tradeImport) {
            const deleteTradeImport = await TradeImport.deleteMany(importFilter);
            if (deleteTradeImport.deletedCount > 0) {
                if (!ImportId) {
                    return true;
                }
                res.status(201).send("Imports Deleted Successfully!!!");
            }
            return false;
        }
        if (!ImportId) {
            return true;
        }
        res.status(400).json({ errors: "Import Doesn't Exists" });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};