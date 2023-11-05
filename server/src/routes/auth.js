import { register, login } from "../controllers/auth.js";
import express from "express";
import { body } from 'express-validator';

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

export default router;