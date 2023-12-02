import mongoose from "mongoose";

const UserInfoSchema = new mongoose.Schema(
    {
        UserId: {
            type: Number,
            required: true,
            unique: true,
        },
        UserName: {
            type: String,
            required: true,
            unique: true,
        },
        Email: {
            type: String,
            required: true,
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

const UserInfo = mongoose.model('UserInfo', UserInfoSchema, 'UserInfo');
export default UserInfo;
