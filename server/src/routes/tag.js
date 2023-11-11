import express from "express";
import { verifyToken } from "../middleware/authorise.js";
import { CreateTag } from "../controllers/tag.js";
import { body } from 'express-validator';

// Validation
const validations = [
    body('TagName', 'Enter a valid tag name').isLength({ min: 1 }),
    body('TagType', 'Select a valid tag type').isLength({ min: 3 })
];
//

/* Routes */
const router = express.Router();
router.post("/api/tags/createTag", validations, verifyToken, CreateTag);

export default router;