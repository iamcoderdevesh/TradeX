import mongoose from "mongoose";

const TradeJournalSechma = new mongoose.Schema(
    {
        JournalId: {
            type: Number,
            required: true,
            unique: true,
        },
        JournalDate: {
            type: Date,
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
        TradeStatus: {
            type: String,
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
        TotalRoi: {
            type: Number,
            required: true,
        },
        TradeIds: {
            type: Array,
            default: [],
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

const TradeJournal = mongoose.model('TradeJournal', TradeJournalSechma, 'TradeJournal');
export default TradeJournal;