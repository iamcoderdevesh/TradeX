import mongoose from "mongoose";

const ImportSechma = new mongoose.Schema(
    {
        ImportId: {
            type: Number,
            required: true,
            unique: true,
        },
        Broker: {
            type: String, 
            required: true,
        },
        ImportFile: {
            type: Buffer,
            default: null,
        },
        ImportDesc: {
            type: String,
            default: null,
        },
        TotalTrades: {
            type: Number,
            default: null,
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

const TradeImports = mongoose.model('TradeImports', ImportSechma, 'TradeImports');
export default TradeImports;