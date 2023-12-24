import UserInfo from "../models/userInfo.js";
import UserDetails from "../models/userDetails.js";
import bcrypt from "bcrypt";
import { validationResult } from 'express-validator';
import { createTokenOptions } from "../utils/cookies.js";
import generateTokens from "../utils/token.js";
import UserToken from "../models/userToken.js";

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
            UserName,
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
        const { Email, Password, IsRemember = true } = req.body;
        const user = await UserInfo.findOne({ Email });
        if (!user) return res.status(400).json({ message: "Email does not exist." });

        const isMatch = await bcrypt.compare(Password, user.Password);
        if (!isMatch) return res.status(400).json({ message: "Incorrect Password." });

        const { authToken, refreshToken } = await generateTokens(user);

        res.cookie('token', authToken, {
            ...createTokenOptions(),
            maxAge: IsRemember ? 30 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000
        });

        res.status(200).json({
            success: true,
            message: "Login Successfully!!!",
            token: refreshToken,
        });
    }
};

/* LOGGING OUT */
export const handleLogout = async (req, res) => {
    const { UserId } = req.body;
    const cookies = req.cookies;

    await UserToken.deleteOne({ UserId });
    if (!cookies?.token) return res.sendStatus(204);//No content

    res.clearCookie('token', createTokenOptions());
    res.status(200).json({
        success: true,
        message: "Logout Successfully!!!",
    });
}