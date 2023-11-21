import { register, login, UpdateProfile, DeleteAll } from "../controllers/auth.js";
import express from "express";
import { verifyToken } from "../middleware/authorise.js";
import { HandleAsyncError } from "../middleware/catchError.js";
import { loginValidations, profileValidations, registerValidations } from "../middleware/validator.js";

/* Routes */
const router = express.Router();
router.post("/api/auth/register", registerValidations, HandleAsyncError(register));
router.post("/api/auth/login", loginValidations, login);

/* Update Profile */
router.post("/api/auth/updateProfile", profileValidations, verifyToken, HandleAsyncError(UpdateProfile));

/* Delete All */
router.delete("/api/auth/deleteAll", verifyToken, HandleAsyncError(DeleteAll));

export default router;