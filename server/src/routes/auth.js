import { register, login } from "../controllers/auth.js";
import express from "express";
import { body } from 'express-validator';
import { verifyToken } from "../middleware/authorise.js";
import { CreateAccount } from "../controllers/account.js";

/* Validation */
const validations = [
    body('UserName', 'Enter a valid name').isLength({ min: 3 }),
    body('Email', 'Enter a valid email').isEmail(),
    body('Password', 'Password must be atleast 8 characters').isLength({ min: 8 })
];

/* Routes */
const router = express.Router();
router.post("/api/auth/register", validations, register);
router.post("/api/auth/login", validations, login);
router.post("/api/createAccount", verifyToken, CreateAccount);

export default router;