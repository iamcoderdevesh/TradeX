import express from "express";
// import { body } from 'express-validator';
import { verifyToken } from "../middleware/authorise.js";
import { ImportTrades } from "../controllers/tradeImport.js";

/* Routes */
const router = express.Router();
router.post("/api/trade/importTrade", verifyToken, ImportTrades);

export default router;