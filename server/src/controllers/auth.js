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
            FirstName: UserName,
            Email,
            CreatedBy,
        });

        await newUser.save();
        const userDetails = await UserDetail.save();


        res.status(201).json({
            success: true,
            userInfo: {
                Email: userDetails.Email
            },
            message: "Register Successfully!!!"
        });
    }
};

/* LOGGING IN */
export const login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    else {
        const { Email, Password } = req.body;
        const user = await UserInfo.findOne({ Email });
        if (!user) return res.status(400).json({ message: "Email does not exist." });

        const isMatch = await bcrypt.compare(Password, user.Password);
        if (!isMatch) return res.status(400).json({ message: "Incorrect Password." });

        const token = jwt.sign({ id: user.UserId }, process.env.JWT_SECRET);

        res.status(200).json({
            success: true,
            message: "Login Successfully!!!",
            token,
            userInfo: {
                FirstName: user.UserName,
                Email: user.Email
            }
        });
    }
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
}

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
}