import User from "../models/userInfo.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { validationResult } from 'express-validator';

/* REGISTER USER */
export const register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    else {
        try {
            const { UserName, Email, Password } = req.body;

            const salt = await bcrypt.genSalt();
            const passwordHash = await bcrypt.hash(Password, salt);

            const UserId = Math.floor(Math.random() * 10000)
            const CreatedBy = UserId;

            const newUser = new User({
                UserId,
                UserName,
                Email,
                Password: passwordHash,
                CreatedBy,
            });

            const savedUser = await newUser.save();
            res.status(201).send("success");

        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
};

/* LOGGING IN */
export const login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    else {
        try {
            const { UserName, Password } = req.body;
            const user = await User.findOne({ UserName: UserName });
            if (!user) return res.status(400).json({ msg: "Username does not exist." });

            const isMatch = await bcrypt.compare(Password, user.Password);
            if (!isMatch) return res.status(400).json({ msg: "Invalid credentials." });

            const token = jwt.sign({ id: user.UserId }, process.env.JWT_SECRET);
            const response = { id: user.UserId, username: user.UserName, email: user.Email };
            res.status(200).json({ token, response });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
};