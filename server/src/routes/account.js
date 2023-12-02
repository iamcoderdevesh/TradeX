import express from "express";
import { verifyToken } from "../middleware/authorise.js";
import { CreateUpdateAccount, DeleteAccount, GetAccountDetails, SwitchAccount } from "../controllers/account.js";
import { HandleAsyncError } from "../middleware/catchError.js";
import { accountValidations } from "../middleware/validator.js";

/* Routes */
const router = express.Router();
router.use(verifyToken);

/*Create/Update Account */
router.post("/accounts/createUpdateAccount", accountValidations, HandleAsyncError(CreateUpdateAccount));

/*Switch Account */
router.get("/accounts/:accountId/switchAccount", HandleAsyncError(SwitchAccount));

/*Get Account Details */
router.get("/accounts/getAccountDetails/:id", HandleAsyncError(GetAccountDetails));

/* Delete Account */
router.delete("/accounts/deleteAccount", HandleAsyncError(DeleteAccount));

export default router;