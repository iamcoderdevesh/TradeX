import mongoose from "mongoose";

const TransactionSechma = new mongoose.Schema(
    {
        TransactionId: {
            type: Number,
            required: true,
            unique: true,
        },
        TransName: {
            type: String, 
            required: true,
        },
        TransAmount: {
            type: Number,
            required: true,
        },
        AccountId: {
            type: Number,
            required: true,
            ref: "Accounts",
        },
        UserId: {
            type: Number,
            required: true,
            ref: "UserInfo",
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

const Transaction = mongoose.model('Transaction', TransactionSechma, 'Transaction');
export default Transaction;