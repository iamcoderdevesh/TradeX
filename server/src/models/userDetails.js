import mongoose from "mongoose";

const UserDetailSechma = new mongoose.Schema(
    {
        UserDetId: {
            type: Number,
            required: true,
            unique: true,
        },
        UserId: {
            type: Number, 
            ref: "UserInfo",
            required: true,
            unique: true,
        },
        FullName: {
            type: String,
            required: true,
            min: 5,
            max: 250,
        },
        Email: {
            type: String,
            required: true,
            max: 250,
            unique: true,
        },
        PhoneNo: {
            type: BigInt,
            default: null,
            min: 5,
            max: 250,
        },
        BirthDate: {
            type: Date,
            default: null,
        },
        ProfileImage: {
            type: Buffer,
            default: null,
        },
        IsVerified: {
            type: Boolean,
            default: false,
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

const UserDetails = mongoose.model('UserDetails', UserDetailSechma, 'UserDetails');
export default UserDetails;