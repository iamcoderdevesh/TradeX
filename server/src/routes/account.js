import express from "express";
import { verifyToken } from "../middleware/authorise.js";
import { CreateUpdateAccount, DeleteAccount, GetAccountDetails, SwitchAccount } from "../controllers/account.js";
import { HandleAsyncError } from "../middleware/catchError.js";
import { accountValidations } from "../middleware/validator.js";

/* Routes */
const router = express.Router();

/*Create/Update Account */
router.post("/api/accounts/createUpdateAccount", accountValidations, verifyToken, HandleAsyncError(CreateUpdateAccount));

/*Switch Account */
router.get("/api/accounts/:accountId/switchAccount", verifyToken, HandleAsyncError(SwitchAccount));

/*Get Account Details */
router.get("/api/accounts/getAccountDetails", verifyToken, HandleAsyncError(GetAccountDetails));

/* Delete Account */
router.delete("/api/accounts/deleteAccount", verifyToken, HandleAsyncError(DeleteAccount));

export default router;