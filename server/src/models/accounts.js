import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
    TransactionId: {
        type: Number,
        unique: true,
    },
    TransName: String,
    TransAmount: Number,
    Currency: String,
    TransDate: {
        type: Date,
        default: Date.now,
    },
});

const AccountSchema = new mongoose.Schema(
    {
        AccountId: {
            type: Number,
            required: true,
            unique: true,
        },
        AccountName: {
            type: String,
            required: true,
        },
        Market: {
            type: String,
            required: true,
        },
        Broker: {
            type: String,
            required: true,
        },
        InitialBalance: {
            type: Number,
            required: true,
        },
        Currency: {
            type: String,
            required: true,
        },
        TotalBalance: {
            type: Number,
            required: true,
        },
        Transaction: {
            type: [TransactionSchema],
            default: [],
        },
        UserId: {
            type: Number,
            ref: "UserInfo",
            required: true,
            unique: true,
        },
        CreatedBy: {
            type: Number,
            required: true,
            ref: "UserInfo",
        },
        UpdatedBy: {
            type: Number,
            default: null,
            ref: "UserInfo",
        },
    },
    { timestamps: true }
);

const Accounts = new mongoose.model('Accounts', AccountSchema, 'Accounts');
export default Accounts;