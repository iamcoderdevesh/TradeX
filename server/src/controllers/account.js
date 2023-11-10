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

            // Find the last Id from Collection. If record does'nt exist, start with 1, otherwise increment the last Id
            let lastId = await Accounts.findOne().sort('-AccountId');            
            const AccountId = lastId ? lastId.AccountId + 1 : 1;

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