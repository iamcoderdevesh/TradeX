import { validationResult } from 'express-validator';
import AccountDetails from "../models/accounts.js";
import { DeleteTrades } from './tradeDetail.js';
import { DeleteTag } from './tag.js';
import { DeleteTradeImport } from './tradeImport.js';

/* Creating/Updating Account */
export const CreateUpdateAccount = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    else {
        try {
            const { AccountId = 0, UserId, AccountName, Market, Broker, InitialBalance, Currency } = req.body;

            //Checking the records exists or not
            const account = await AccountDetails.findOne({ UserId, AccountId });

            //If record exists Update Account
            if (account) {
                const updateAccount = await AccountDetails.findOneAndUpdate(
                    { UserId, AccountId },
                    { AccountName, Market, Broker, InitialBalance, Currency, UpdatedBy: UserId },
                    { new: true }
                );

                if (updateAccount) {
                    const { AccountId, AccountName, Market, Broker, InitialBalance, Currency } = updateAccount;
                    res.status(200).json({ AccountId, AccountName, Market, Broker, InitialBalance, Currency });
                }
            }
            //Else Create a new Account
            else {
                // Find the last Id from Collection. If record does'nt exist, start with 1, otherwise increment the last Id
                let lastId = await AccountDetails.findOne().sort('-AccountId');
                const AccountId = lastId ? lastId.AccountId + 1 : 1;

                const newAccount = new AccountDetails({
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
            }

        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
};

/* Get Account Details */
export const GetAccountDetails = async (req, res) => {
    try {
        const { UserId } = req.body;

        //Checking the records exists or not
        const account = await AccountDetails.find({ UserId });

        if (account) {
            res.status(201).send(account);
        }
        else {
            return res.status(404).send(`Account Doesn't Exists`);
        }

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

/* Switch Account */
export const SwitchAccount = async (req, res) => {
    try {
        const { UserId } = req.body;
        const AccountId = parseInt(req.params.accountId);

        //Checking the records exists or not
        const account = await AccountDetails.findOne({ UserId, AccountId }).select('AccountId AccountName -_id');

        //If record exists Update Account
        if (account) {
            res.status(201).send(account);
        }
        else {
            return res.status(404).send(`Account Doesn't Exists`);
        }

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

/* Deleting Account */
export const DeleteAccount = async (req, res) => {

    const { AccountId, UserId, isVerified } = req.body;

    try {
        //Checking the records exists or not
        const account = await AccountDetails.findOne({ UserId, AccountId });
        if (account) {
            const deleteAccount = await AccountDetails.findOneAndDelete({ UserId, AccountId });
            if (deleteAccount) {
                if (await DeleteTrades(req, res)) {
                    //If isVerified is true that means user is verified and can delete everthing
                    if (isVerified) {
                        await DeleteTag(req, res);
                        await DeleteTradeImport(req, res);
                    }
                    return res.status(201).send("Account Deleted Successfully!!!");
                }
            }
            res.status(400).json({ errors: "Unable to delete account" });
        }

        else {
            res.status(400).json({ errors: "Account Doesn't Exists" });
        }
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};