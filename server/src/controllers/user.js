import UserInfo from "../models/userInfo.js";
import UserDetails from "../models/userDetails.js";
import { validationResult } from 'express-validator';
import { DeleteAccount } from "./account.js";
import bcrypt from "bcrypt";
import generateTokens from "../utils/token.js";
import jwt from "jsonwebtoken";

/* Fetch User */
export const GetUserDetails = async (req, res) => {

    const { UserId } = req.body;

    const userDetails = await UserDetails.findOne({ UserId: UserId }).select('-_id FirstName LastName Email PhoneNo BirthDate');
    res.status(201).json({
        success: true,
        userInfo: userDetails
    });
};

/* Handle Refresh Token */
export const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.token) return res.status(203).json({ message: "Unauthorized" });
    const refreshToken = cookies.token;
    jwt.verify(
        refreshToken,
        process.env.JWT_SECRET,
        async (err, decoded) => {
            if (err) return res.status(403).json({ message: 'Forbidden' });
            const foundUser = await UserInfo.findOne({ UserId: decoded.id });

            if (!foundUser) return res.status(401).json({ message: 'Unauthorized' });

            const { refreshToken } = await generateTokens(foundUser);

            res.status(200).json({ success: true, token: refreshToken });
        }
    )
};

/* Update Profile */
export const UpdateProfile = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    else {
        const { UserId, FirstName, LastName, Email, Phone, BirthDate } = req.body;

        const userDetails = await UserDetails.findOneAndUpdate(
            { UserId },
            { FirstName, LastName, PhoneNo: Phone, BirthDate, UpdatedBy: UserId },
            { new: true }
        );

        await UserInfo.findOneAndUpdate(
            { UserId: UserId },
            { Email: Email },
        );

        if (userDetails) {
            const { FirstName, LastName, Email, PhoneNo, BirthDate } = userDetails;

            res.status(200).json({
                success: true,
                message: "Profile Upadated Successfully!!!",
                userInfo: {
                    FirstName,
                    LastName,
                    Email,
                    Phone: PhoneNo,
                    BirthDate
                }
            });
        }
    }
};

/* Delete Everthing */
export const DeleteAll = async (req, res) => {
    const { UserId, Password } = req.body;

    //Checking the records exists or not
    const user = await UserInfo.findOne({ UserId: UserId });
    if (!user) return res.status(400).json({ message: "User doesn't exist." });

    const isMatch = await bcrypt.compare(Password, user.Password);
    if (!isMatch) return res.status(400).json({ message: "Incorrect Password!!!" });

    const deleteUser = await UserInfo.findOneAndDelete({ UserId });
    const deleteUserDet = await UserDetails.findOneAndDelete({ UserId });

    if (deleteUser && deleteUserDet) {
        req.body.isVerified = true;
        await DeleteAccount(req, res);
    }
    res.status(400).json({ errors: "Unable to delete account" });
};