import express from "express";
import { verifyToken } from "../middleware/authorise.js";
import { HandleAsyncError } from "../middleware/catchError.js";
import { profileValidations } from "../middleware/validator.js";
import { DeleteAll, GetUserDetails, UpdateProfile } from "../controllers/user.js";

/* Routes */
const router = express.Router();

router.use(verifyToken);

/* Update Profile */
router.post("/auth/updateProfile", profileValidations, HandleAsyncError(UpdateProfile));

/* Get Profile */
router.get("/auth/getUserDetails", HandleAsyncError(GetUserDetails));

/* Delete All */
router.delete("/auth/deleteAll", HandleAsyncError(DeleteAll));

export default router;