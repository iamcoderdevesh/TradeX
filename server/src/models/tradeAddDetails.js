import mongoose from "mongoose";

const TradeAddDetailSechma = new mongoose.Schema(
    {
        TradeAddId: {
            type: Number,
            required: true,
            unique: true,
        },
        EntryReason: {
            type: String, 
            required: true,
        },
        ExitReason: {
            type: String,
            required: true,
        },
        Emotions: {
            type: String,
            required: true,
        },
        MarketCondition: {
            type: String,
            required: true,
        },
        Screenshots: {
            type: Buffer,
            default: null,
        },
        TradeAddInfo: {
            type: String,
            required: true,
        },
        TradeId: {
            type: Number,
            required: true,
            ref: "TradeDetails",
            localField: 'TradeId',
            foreignField: 'TradeId'
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

const TradeAddDetails = mongoose.model('TradeAddDetails', TradeAddDetailSechma, 'TradeAddDetails');
export default TradeAddDetails;