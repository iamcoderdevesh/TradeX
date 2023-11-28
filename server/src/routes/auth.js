import { register, login, handleLogout } from "../controllers/auth.js";
import express from "express";
import { HandleAsyncError } from "../middleware/catchError.js";
import { loginValidations, registerValidations } from "../middleware/validator.js";

/* Routes */
const router = express.Router();

router.post("/auth/register", registerValidations, HandleAsyncError(register));
router.post("/auth/login", loginValidations, HandleAsyncError(login));
router.get("/auth/logout", HandleAsyncError(handleLogout));

export default router;