import express from "express";
import { body } from 'express-validator';
import { verifyToken } from "../middleware/authorise.js";
import { DeleteTradeImport, ImportTrades } from "../controllers/tradeImport.js";
import { AddUpdateTrade, DeleteTrades, GetRecentTrade, getTradeData } from "../controllers/tradeDetail.js";
import { AddUpdateTradeStats, getDailyPnLAndReturns, getMonthlyPnLAndRevenue, getTotalPnL, getWeeklyPnL } from "../controllers/tradeStats.js";
import { AddTradeJournal, getJournalData } from "../controllers/tradeJournal.js";
import { CalculateStatistics } from "../utils/calculate.js";

//Validation
const tradeValidations = [
    body('TradeName', 'Enter a valid trade name').isLength({ min: 3 }),
    body('Market', 'Please select market type').isLength({ min: 2 }),
    body('Broker', 'Please select broker').isLength({ min: 2 }),
    body('Setup', 'Please select setup').isLength({ min: 2 }),
    body('TradeStatus', 'Please select trade status').isLength({ min: 2 }),
    body('Action', 'Please select broker').isLength({ min: 2 }),
    body('Symbol', 'Enter a valid symbol name').isLength({ min: 2 }),
    body('EntryDate', 'Please select valid entry date').isISO8601(),
    body('ExitDate', 'Please select valid exit date').isISO8601(),
    body('EntryPrice', 'Enter a valid entry price').isNumeric().isLength({ min: 1, max: 9 }),
    body('ExitPrice', 'Enter a valid exit price').isNumeric().isLength({ min: 1, max: 9 }),
    body('StopLoss', 'Enter a valid stop loss').isNumeric().isLength({ min: 1, max: 9 }),
    body('Quantity', 'Enter a valid quantity').isNumeric().isLength({ min: 1, max: 9 }),
    body('AccountId', 'Account not found').isLength({ min: 1 }),
    body('isAdd', 'Error! Something went wrong').isLength({ min: 2 })
];

const importValidations = [
    body('Broker', 'Please select valid broker').isLength({ min: 2 }),
    body('AccountName', 'Please select valid account name').isLength({ min: 2 }),
    body('ImportDesc', 'Please enter a valida import description').isLength({ min: 2 }),
    body('AccountId', 'Account not found').isNumeric().isLength({ min: 1, max: 9 })
];
//

/* Routes */
/* Insert/Update Trade */
const router = express.Router();
router.post("/api/trade/importTrade", importValidations, verifyToken, ImportTrades);
router.post("/api/trade/addUpdateTrade", tradeValidations, verifyToken, AddUpdateTrade, AddUpdateTradeStats, AddTradeJournal);

//#region Fetch Data
//Fetch Trade Data
router.get("/api/trade/:accountId/getTrade", verifyToken, getTradeData);
router.get("/api/trade/:accountId/getJounral", verifyToken, getJournalData);
router.get("/api/trade/:accountId/getRecentTrades", verifyToken, GetRecentTrade);

//Fetch Trade Statistics
router.get("/api/trade/:accountId/getStats", verifyToken, CalculateStatistics);

//Fetch Dashboard Chart Data (TotalNetPnL)
router.get("/api/trade/:accountId/getTotalPnlStats", verifyToken, getTotalPnL);

//Fetch Dashboard Chart Data (Weekly PnL)
router.get("/api/trade/:accountId/getWeeklyStats", verifyToken, getWeeklyPnL);

//Fetch Dashboard Chart Data (Monthly PnL & Revenue)
router.get("/api/trade/:accountId/getMonthlyStats", verifyToken, getMonthlyPnLAndRevenue);

//Fetch Analytics Chart Data (Daily PnL)
router.get("/api/trade/:accountId/getDailyStats", verifyToken, getDailyPnLAndReturns);
//#endregion

/* Delete Trade */
router.delete("/api/trade/deleteTrade", verifyToken, DeleteTrades);
router.delete("/api/trade/deleteImport", verifyToken, DeleteTradeImport);

export default router;