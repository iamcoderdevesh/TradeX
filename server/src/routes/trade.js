import express from "express";
// import { body } from 'express-validator';
import { verifyToken } from "../middleware/authorise.js";
import { ImportTrades } from "../controllers/tradeImport.js";
import { AddTrade } from "../controllers/tradeDetail.js";
import { AddTradeStats } from "../controllers/tradeStats.js";
import { AddTradeJournal } from "../controllers/tradeJournal.js";

/* Routes */
const router = express.Router();
router.post("/api/trade/importTrade", verifyToken, ImportTrades);
router.post("/api/trade/addTrade", verifyToken, AddTrade, AddTradeStats, AddTradeJournal);

export default router;