import express from "express";
import { AddUpdateTrade } from "../controllers/tradeDetail.js";
import { AddUpdateTradeStats } from "../controllers/tradeStats.js";
import { HandleAsyncError } from "../middleware/catchError.js";
import { tradeValidations } from "../middleware/validator.js";
import { AddTradeJournal } from "../controllers/tradeJournal.js";

/* Routes */
const router = express.Router();
router.post("/trade/addUpdateTradeApi/:userId/:accountId", tradeValidations, HandleAsyncError(AddUpdateTrade), HandleAsyncError(AddUpdateTradeStats), HandleAsyncError(AddTradeJournal));

export default router;