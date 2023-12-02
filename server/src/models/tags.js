import mongoose from "mongoose";

const TagSchema = new mongoose.Schema(
    {
        TagId: {
            type: Number,
            required: true,
            unique: true,
        },
        TagName: {
            type: String,
            required: true,
        },
        TagType: {
            type: String,
            required: true,
        },
        TagDesc: {
            type: String,
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

const Tags = new mongoose.model('Tags', TagSchema, 'Tags');
export default Tags;