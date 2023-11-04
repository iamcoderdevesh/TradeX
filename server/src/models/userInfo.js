import mongoose from "mongoose";

const UserInfoSchema = new mongoose.Schema(
    {
        UserId: {
            type: Number,
            required: true,
        },
        UserName: {
            type: String,
            required: true,
            min: 2,
            max: 50,
            unique: true,
        },
        Email: {
            type: String,
            required: true,
            max: 250,
            unique: true,
        },
        Password: {
            type: String,
            required: true,
            min: 8,
        },
        Status: {
            type: Boolean,
            default: true,
        },
        BlockStatus: {
            type: Boolean,
            default: false,
        },
        CreatedBy: {
            type: Number,
            required: true,
        },
        UpdatedBy: {
            type: Number,
            default: null,
        },
        JoinedOn: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

const User = mongoose.model('UserInfo', UserInfoSchema, 'UserInfo');
export default User;
