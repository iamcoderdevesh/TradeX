import { register, login, UpdateProfile, DeleteAll } from "../controllers/auth.js";
import express from "express";
import { body } from 'express-validator';
import { verifyToken } from "../middleware/authorise.js";

//Validation
const registerValidations = [
    body('UserName', 'Enter a valid name').isLength({ min: 3 }),
    body('Email', 'Enter a valid email').isEmail(),
    body('Password', 'Password must be atleast 8 characters').isLength({ min: 8 })
];

const loginValidations = [
    body('UserName', 'Enter a valid username').isLength({ min: 3 }),
    body('Password', 'Password must be atleast 8 characters').isLength({ min: 8 })
];
//

/* Routes */
const router = express.Router();
router.post("/api/auth/register", registerValidations, register);
router.post("/api/auth/login", loginValidations, login);

/* Update Profile */
router.post("/api/auth/updateProfile", verifyToken, UpdateProfile);

/* Delete All */
router.delete("/api/auth/deleteAll", verifyToken, DeleteAll);

export default router;