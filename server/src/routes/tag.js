import express from "express";
// import { body } from 'express-validator';
import { verifyToken } from "../middleware/authorise.js";
import { CreateTag } from "../controllers/tag.js";

/* Routes */
const router = express.Router();
router.post("/api/tags/createTag", verifyToken, CreateTag);

export default router;