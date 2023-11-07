import mongoose from "mongoose";

const TradeStatsSechma = new mongoose.Schema(
    {
        JournalId: {
            type: Number,
            required: true,
            unique: true,
        },
        JournalDate: {
            type: String, 
            required: true,
        },
        TotalNetPnL: {
            type: Number,
            required: true,
        },
        TotalTrades: {
            type: Number,
            required: true,
        },
        TotalWins: {
            type: Number,
            required: true,
        },
        TotalLoss: {
            type: Number,
            required: true,
        },
        Winrate: {
            type: Number,
            required: true,
        },
        TotalFees: {
            type: Number,
            required: true,
        },
        TotalGrossPnL: {
            type: Number,
            required: true,
        },
        TotalRR: {
            type: Number,
            required: true,
        },
        NetRevenue: {
            type: Number,
            required: true,
        },
        GrossRevenue: {
            type: Number,
            required: true,
        },
        TotalRevenue: {
            type: Number,
            required: true,
        },
        TradeId: {
            type: Number,
            required: true,
            unique: true,
            ref: "TradeDetails",
        },
        AccountId: {
            type: Number,
            required: true,
            unique: true,
            ref: "Accounts",
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

const TradeStats = mongoose.model('TradeStats', TradeStatsSechma, 'TradeStats');
export default TradeStats;