import { validationResult } from 'express-validator';
import Accounts from "../models/accounts.js";

/* Creating Account */
export const CreateAccount = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    else {
        try {
            const { UserId, AccountName, Market, Broker, InitialBalance, Currency } = req.body;

            const AccountId = Math.floor(Math.random() * 10000);
            const newAccount = new Accounts({
                AccountId,
                AccountName,
                Market,
                Broker,
                InitialBalance,
                Currency,
                TotalBalance: InitialBalance,
                UserId,
                CreatedBy: UserId,
            });

            await newAccount.save();
            res.status(201).send("Account Created Successfully!!!");

        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
};