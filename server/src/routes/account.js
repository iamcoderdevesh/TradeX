import express from "express";
// import { body } from 'express-validator';
import { verifyToken } from "../middleware/authorise.js";
import { CreateAccount } from "../controllers/account.js";

/* Routes */
const router = express.Router();
router.post("/api/accounts/createAccount", verifyToken, CreateAccount);

export default router;