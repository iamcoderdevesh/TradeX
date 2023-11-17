import UserInfo from "../models/userInfo.js";
import UserDetails from "../models/userDetails.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { validationResult } from 'express-validator';
import { DeleteAccount } from "./account.js";

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

            // Find the last UserId from UserInfo Collection
            let lastId = await UserInfo.findOne().sort('-UserId');

            // If no users exist, start with 1, otherwise increment the last UserId
            const UserId = lastId ? lastId.UserId + 1 : 1;
            const CreatedBy = UserId;

            const newUser = new UserInfo({
                UserId,
                UserName,
                Email,
                Password: passwordHash,
                CreatedBy,
            });

            // Find the last UserDetId from UserDetail Collection
            lastId = await UserDetails.findOne().sort('-UserDetId');
            const UserDetId = lastId ? lastId.UserDetId + 1 : 1;

            const UserDetail = new UserDetails({
                UserDetId,
                UserId,
                FullName: UserName,
                Email,
                CreatedBy,
            });

            await newUser.save();
            await UserDetail.save();

            res.status(201).send("Register Successfully!!!");

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
            const user = await UserInfo.findOne({ UserName: UserName });
            if (!user) return res.status(400).json({ msg: "Username does not exist." });

            const isMatch = await bcrypt.compare(Password, user.Password);
            if (!isMatch) return res.status(400).json({ msg: "Invalid credentials." });

            const token = jwt.sign({ id: user.UserId }, process.env.JWT_SECRET);
            res.status(200).json({ token });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
};

/* Update Profile */
export const UpdateProfile = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    else {
        try {
            const { UserId, UserDetId, FullName, Email, Phone, BirthDate } = req.body;

            const userDetails = await UserDetails.findOneAndUpdate(
                { UserId, UserDetId },
                { FullName, Email, PhoneNo: Phone, BirthDate, UpdatedBy: UserId },
                { new: true }
            );

            await UserInfo.findOneAndUpdate(
                { UserId: UserId },
                { Email: Email },
            );

            if (userDetails) {
                const { FullName, Email, PhoneNo, BirthDate } = userDetails;
                res.status(200).json({ FullName, Email, PhoneNo, BirthDate });
            }
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

/* Delete Everthing */
export const DeleteAll = async (req, res) => {
    const { UserId, Password } = req.body;

    try {
        //Checking the records exists or not
        const user = await UserInfo.findOne({ UserId: UserId });
        if (!user) return res.status(400).json({ msg: "User doesn't exist." });

        const isMatch = await bcrypt.compare(Password, user.Password);
        if (!isMatch) return res.status(400).json({ msg: "Incorrect Password!!!" });

        const deleteUser = await UserInfo.findOneAndDelete({ UserId });
        const deleteUserDet = await UserDetails.findOneAndDelete({ UserId });

        if (deleteUser && deleteUserDet) {
            req.body.isVerified = true;
            await DeleteAccount(req, res); 
        }
        res.status(400).json({ errors: "Unable to delete account" });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}