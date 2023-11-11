import express from "express";
import { body } from 'express-validator';
import { verifyToken } from "../middleware/authorise.js";
import { CreateAccount } from "../controllers/account.js";

//Validation
const accountValidations = [
    body('AccountName', 'Enter a valid account name').isLength({ min: 3 }),
    body('Market', 'Please select market type').isLength({ min: 2 }),
    body('Broker', 'Please select broker').isLength({ min: 2 }),
    body('InitialBalance', 'Enter a valid initial balance').isNumeric().isLength({ min: 1, max: 9 }),
    body('Currency', 'Please select currency').isLength({ min: 2 })
];
//

/* Routes */
const router = express.Router();
router.post("/api/accounts/createAccount", accountValidations, verifyToken, CreateAccount);

export default router;