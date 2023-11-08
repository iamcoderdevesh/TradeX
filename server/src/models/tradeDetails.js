import mongoose from "mongoose";

const TradeDetailSechma = new mongoose.Schema(
    {
        TradeId: {
            type: Number,
            required: true,
            unique: true,
        },
        TradeName: {
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
        Setup: {
            type: String,
            required: true,
        },
        TradeStatus: {
            type: String,
            required: true,
        },
        Action: {
            type: String,
            required: true,
        },
        Symbol: {
            type: String,
            required: true,
        },
        EntryDate: {
            type: Date,
            required: true,
        },
        ExitDate: {
            type: Date,
            required: true,
        },
        EntryPrice: {
            type: Number,
            required: true,
        },
        ExitPrice: {
            type: Number,
            required: true,
        },
        StopLoss: {
            type: Number,
            required: true,
        },
        Quantity: {
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
            ref: "UserInfo",
            required: true,
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

const TradeDetails = mongoose.model('TradeDetails', TradeDetailSechma, 'TradeDetails');
export default TradeDetails;