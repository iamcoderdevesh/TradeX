import express from "express";
import { verifyToken } from "../middleware/authorise.js";
import { DeleteTradeImport, ImportTrades } from "../controllers/tradeImport.js";
import { AddUpdateTrade, DeleteTrades, GetRecentTrade, getTradeData } from "../controllers/tradeDetail.js";
import { AddUpdateTradeStats, getDailyPnLAndReturns, getMonthlyPnLAndRevenue, getTotalPnL, getWeeklyPnL } from "../controllers/tradeStats.js";
import { AddTradeJournal, GetJournalDetails, GetJournalForCalendar } from "../controllers/tradeJournal.js";
import { CalculateStatistics } from "../utils/calculate.js";
import { HandleAsyncError } from "../middleware/catchError.js";
import { importValidations, tradeValidations } from "../middleware/validator.js";

/* Routes */
const router = express.Router();

//#region Insert/Update Trade
router.post("/api/trade/importTrade", importValidations, verifyToken, HandleAsyncError(ImportTrades));
router.post("/api/trade/addUpdateTrade", tradeValidations, verifyToken, AddUpdateTrade, AddUpdateTradeStats, HandleAsyncError(AddTradeJournal));
//#endregion

//#region Fetch Data
//Fetch Trade Data
router.get("/api/trade/:accountId/getTrade", verifyToken, HandleAsyncError(getTradeData));
router.get("/api/trade/:accountId/getJounral", verifyToken, HandleAsyncError(GetJournalDetails));
router.get("/api/trade/:accountId/getRecentTrades", verifyToken, HandleAsyncError(GetRecentTrade));

//Fetch Trade Statistics
router.get("/api/trade/:accountId/getStats", verifyToken, HandleAsyncError(CalculateStatistics));

//Fetch PnL Calendar
router.get("/api/trade/:accountId/getJournalForCalendar", verifyToken, HandleAsyncError(GetJournalForCalendar));

//Fetch Dashboard Chart Data (TotalNetPnL)
router.get("/api/trade/:accountId/getTotalPnlStats", verifyToken, HandleAsyncError(getTotalPnL));

//Fetch Dashboard Chart Data (Weekly PnL)
router.get("/api/trade/:accountId/getWeeklyStats", verifyToken, HandleAsyncError(getWeeklyPnL));

//Fetch Dashboard Chart Data (Monthly PnL & Revenue)
router.get("/api/trade/:accountId/getMonthlyStats", verifyToken, HandleAsyncError(getMonthlyPnLAndRevenue));

//Fetch Analytics Chart Data (Daily PnL)
router.get("/api/trade/:accountId/getDailyStats", verifyToken, HandleAsyncError(getDailyPnLAndReturns));
//#endregion

//#region Delete Trade
router.delete("/api/trade/deleteTrade", verifyToken, HandleAsyncError(DeleteTrades));
router.delete("/api/trade/deleteImport", verifyToken, HandleAsyncError(DeleteTradeImport));
//#endregion

export default router;