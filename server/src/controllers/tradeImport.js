import { validationResult } from 'express-validator';
import TradeImport from "../models/tradeImports.js";
import excelToJson from 'convert-excel-to-json';
import { AddUpdateTrade } from './tradeDetail.js';
import fs from "fs";

/* Creating Account */
export const ImportTrades = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    else {
        const { UserId, broker, AccountId, description } = req.body;
        const file = 'uploads/' + req.file.filename;
        const result = excelToJson({
            sourceFile: file,
            header: {
                rows: 1
            },
            columnToKey: {
                "*": "{{columnHeader}}"
            }
        });

        if (result?.Sheet1?.length !== 0) {
            let tradeCount = 0;
            req.body.IsImport = true;
            for (const row of result.Sheet1) {
                req.body.TradeId = 0;
                Object.assign(req.body, row);
                await AddUpdateTrade(req, res, next);
                tradeCount++;
            }

            let lastId = await TradeImport.findOne().sort('-ImportId');
            const id = lastId ? lastId.ImportId + 1 : 1;

            const newTrade = new TradeImport({ ImportId: id, Broker: broker, ImportDesc: description, TotalTrades: tradeCount, AccountId, UserId, CreatedBy: UserId });

            const trade = await newTrade.save();
            if (!trade) {
                res.status(400).json({
                    success: true,
                    message: "Oops Something Went! Unable to Insert Trade"
                });
            }
        } else {
            res.status(400).json({
                success: false,
                message: "Excel file is empty or invalid"
            });
        }

        fs.unlinkSync(`uploads/${req.file.filename}`);

        return res.status(200).json({
            success: true,
            message: "Trades Imported Successfully!!!"
        });
    }
};

/* Deleting TradeImport */
export const DeleteTradeImport = async (req, res) => {
    const { UserId, AccountId, ImportId } = req.body;
    const importFilter = { UserId, AccountId };

    /* If ImportId Exists delete single record */
    if (ImportId) {
        importFilter.ImportId = ImportId;
    }

    /* Else Delete all Records */
    //Checking the records exists or not
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
};