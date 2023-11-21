import express from "express";
import { verifyToken } from "../middleware/authorise.js";
import { CreateUpdateTag, DeleteTag } from "../controllers/tag.js";
import { HandleAsyncError } from "../middleware/catchError.js";
import { tagValidations } from "../middleware/validator.js";

/* Router setup */
const router = express.Router();

/* Create Tag */
router.post("/api/tags/createUpdateTag", tagValidations, verifyToken, HandleAsyncError(CreateUpdateTag));

/* Delete Tag */
router.delete("/api/tags/deleteTag", verifyToken, HandleAsyncError(DeleteTag));

export default router;