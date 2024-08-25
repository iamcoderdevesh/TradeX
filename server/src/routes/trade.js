import express from "express";
import { verifyToken } from "../middleware/authorise.js";
import { DeleteTradeImport, ImportTrades, GetImportTrades } from "../controllers/tradeImport.js";
import { AddUpdateTrade, DeleteTrades, GetRecentTrade, getTradeData, getTradeDetails } from "../controllers/tradeDetail.js";
import { AddUpdateTradeStats, getDailyPnLAndReturns, getMonthlyPnLAndRevenue, getTotalPnL, getWeeklyPnL } from "../controllers/tradeStats.js";
import { AddTradeJournal, GetJournalDetails, GetJournalForCalendar } from "../controllers/tradeJournal.js";
import { CalculateStatistics } from "../utils/calculate.js";
import { HandleAsyncError } from "../middleware/catchError.js";
import { importValidations, tradeValidations } from "../middleware/validator.js";
import multer from "multer";

/* Routes */
const router = express.Router();
router.use(verifyToken);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
    //   const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.originalname);
    }
});
const upload = multer({ storage });



//#region Insert/Update Trade
router.post("/trade/importTrade", upload.single('file'), verifyToken, HandleAsyncError(ImportTrades));
router.post("/trade/addUpdateTrade", tradeValidations, HandleAsyncError(AddUpdateTrade), HandleAsyncError(AddUpdateTradeStats), HandleAsyncError(AddTradeJournal));
//#endregion

//#region Fetch Data 
//Fetch Trade Data
router.get("/trade/:accountId/getTradeStatistics", HandleAsyncError(getTradeData));
router.get("/trade/:id/getTradeDetails", HandleAsyncError(getTradeDetails));
router.get("/trade/:accountId/getJounral", HandleAsyncError(GetJournalDetails));
router.get("/trade/:accountId/getRecentTrades", HandleAsyncError(GetRecentTrade));

//Get Import File data
router.get("/trade/getImportTrades", HandleAsyncError(GetImportTrades));

//Fetch Trade Statistics
router.get("/trade/:accountId/getStats", HandleAsyncError(CalculateStatistics));

//For Detailed stats with currency and float values
router.get("/trade/:accountId/getStats/:type", HandleAsyncError(CalculateStatistics));

//Fetch PnL Calendar
router.get("/trade/:accountId/getJournalForCalendar", HandleAsyncError(GetJournalForCalendar));

//Fetch Dashboard Chart Data (TotalNetPnL)
router.get("/trade/:accountId/getTotalPnlStats", HandleAsyncError(getTotalPnL));

//Fetch Dashboard Chart Data (Weekly PnL)
router.get("/trade/:accountId/getWeeklyStats", HandleAsyncError(getWeeklyPnL));

//Fetch Dashboard Chart Data (Monthly PnL & Revenue)
router.get("/trade/:accountId/getMonthlyStats", HandleAsyncError(getMonthlyPnLAndRevenue));

//Fetch Analytics Chart Data (Daily PnL)
router.get("/trade/:accountId/getDailyStats", HandleAsyncError(getDailyPnLAndReturns));
//#endregion

//#region Delete Trade
router.delete("/trade/deleteTrade", HandleAsyncError(DeleteTrades));
router.delete("/trade/deleteImport", HandleAsyncError(DeleteTradeImport));
//#endregion

export default router;