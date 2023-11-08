import mongoose from "mongoose";

const TradeStatsSechma = new mongoose.Schema(
    {
        TradeStatsId: {
            type: Number,
            required: true,
            unique: true,
        },
        TradeStatus: {
            type: String, 
            required: true,
        },
        NetProfit: {
            type: Number,
            required: true,
        },
        NetLoss: {
            type: Number,
            required: true,
        },
        NetPnL: {
            type: Number,
            required: true,
        },
        NetRoi: {
            type: Number,
            required: true,
        },
        TotalFees: {
            type: Number,
            required: true,
        },
        GrossPnL: {
            type: Number,
            required: true,
        },
        TradeRisk: {
            type: Number,
            required: true,
        },
        RiskReward: {
            type: Number,
            required: true,
        },
        TradeDate: {
            type: Date, 
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

const TradeStats = mongoose.model('TradeStats', TradeStatsSechma, 'TradeStats');
export default TradeStats;