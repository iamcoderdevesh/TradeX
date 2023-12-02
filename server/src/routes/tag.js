import express from "express";
import { verifyToken } from "../middleware/authorise.js";
import { CreateUpdateTag, DeleteTag, GetTagDetails } from "../controllers/tag.js";
import { HandleAsyncError } from "../middleware/catchError.js";
import { tagValidations } from "../middleware/validator.js";

/* Router setup */
const router = express.Router();
router.use(verifyToken);

/* Create Tag */
router.post("/tags/createUpdateTag", tagValidations, HandleAsyncError(CreateUpdateTag));

/* Get All Tag */
router.get("/tags/getTagDetails/:TagId", HandleAsyncError(GetTagDetails));

/* Delete Tag */
router.delete("/tags/deleteTag", HandleAsyncError(DeleteTag));

export default router;