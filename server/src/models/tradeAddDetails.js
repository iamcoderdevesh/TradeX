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
            default: null,
        },
        ExitReason: {
            type: String,
            default: null,
        },
        Emotions: {
            type: String,
            default: null,
        },
        MarketCondition: {
            type: String,
            default: null,
        },
        Screenshots: {
            type: Buffer,
            default: null,
        },
        TradeAddInfo: {
            type: String,
            default: null,
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