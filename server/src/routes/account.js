import express from "express";
import { body } from 'express-validator';
import { verifyToken } from "../middleware/authorise.js";
import { CreateUpdateAccount, DeleteAccount, GetAccountDetails, SwitchAccount } from "../controllers/account.js";

//Validation
const accountValidations = [
    body('AccountName', 'Enter a valid account name').isLength({ min: 3 }),
    body('Market', 'Please select market type').isLength({ min: 2 }),
    body('Broker', 'Please select broker').isLength({ min: 2 }),
    body('InitialBalance', 'Enter a valid initial balance').isNumeric().isLength({ min: 1, max: 9 }),
    body('Currency', 'Please select currency').isLength({ min: 2 })
];

/* Routes */
const router = express.Router();

/*Create/Update Account */
router.post("/api/accounts/createUpdateAccount", accountValidations, verifyToken, CreateUpdateAccount);

/*Switch Account */
router.get("/api/accounts/:accountId/switchAccount", verifyToken, SwitchAccount);

/*Get Account Details */
router.get("/api/accounts/getAccountDetails", verifyToken, GetAccountDetails);

/* Delete Account */
router.delete("/api/accounts/deleteAccount", verifyToken, DeleteAccount);

export default router;