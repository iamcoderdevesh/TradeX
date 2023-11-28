import mongoose from "mongoose";

const userTokenSchema = new mongoose.Schema(
    {
        UserId: {
            type: Number,
            required: true
        },
        Token: {
            type: String,
            required: true
        },
        Status: {
            type: String,
            default: true,
        },
        CreatedBy: {
            type: Number,
            required: true,
        },
        UpdatedBy: {
            type: Number,
            default: null,
        },
    },
    { timestamps: true }
);

const UserToken = mongoose.model("UserToken", userTokenSchema);

export default UserToken;