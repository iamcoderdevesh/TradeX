import express from "express";
import { HandleAsyncError } from "../middleware/catchError.js";
import { handleRefreshToken } from "../controllers/user.js";

/* Routes */
const router = express.Router();

/*Handle Refresh Token */
router.get("/auth/refresh", HandleAsyncError(handleRefreshToken));

export default router;