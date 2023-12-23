import { validationResult } from 'express-validator';
import Tags from "../models/tags.js";

/* Create/Update Tags */
export const CreateUpdateTag = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    else {
        const { UserId, TagId = 0, TagName, TagType, TagDesc } = req.body;

        //Checking the records exists or not
        const tags = await Tags.findOne({ UserId, TagId });

        //If record exists Update Account
        if (tags) {
            const updateTags = await Tags.findOneAndUpdate(
                { UserId, TagId },
                { TagName, TagType, TagDesc, UpdatedBy: UserId },
                { new: true }
            );

            if (updateTags) {
                const { TagId, TagName, TagType, TagDesc } = updateTags;
                res.status(201).json({
                    success: true,
                    message: "Tag Updated Successfully!!!"
                });
            }
        }

        else {
            // Find the last Id from Collection. If record does'nt exist, start with 1, otherwise increment the last Id
            let lastId = await Tags.findOne().sort('-TagId');
            const TagId = lastId ? lastId.TagId + 1 : 1;

            const newTag = new Tags({
                TagId,
                TagName,
                TagType,
                TagDesc,
                UserId,
                CreatedBy: UserId,
            });

            await newTag.save();
            res.status(201).json({
                success: true,
                message: "Tag Created Successfully!!!"
            });
        }
    }
};

/* Get Account Details */
export const GetTagDetails = async (req, res) => {
    const { UserId } = req.body;
    const TagId = parseInt(req.params.TagId);

    const tagFilter = { UserId };

    //Search Filter by TagId Filter
    if (TagId !== 0) tagFilter.TagId = TagId;

    //Checking the records exists or not
    let tag = await Tags.findOne(tagFilter).select('-_id TagId TagName TagType TagDesc');

    if (TagId === 0 || !tag) tag = await Tags.find({ UserId }).select('-_id TagId TagName TagType TagDesc');

    if (tag) {
        res.status(200).json({
            success: true,
            tag
        });
    }
    else {
        return res.status(404).send(`Tag Doesn't Exists`);
    }
};

/* Deleting Tags */
export const DeleteTag = async (req, res) => {

    const { UserId, TagId } = req.body;
    const tagFilter = { UserId };

    if (TagId) {
        tagFilter.TagId = TagId;
    }

    //Checking the records exists or not
    const tag = await Tags.findOne(tagFilter);
    if (tag) {
        const deleteTag = await Tags.deleteMany(tagFilter);
        if (deleteTag.deletedCount > 0) {
            if (!TagId) {
                return true;
            }
            return res.status(201).json({
                success: true,
                message: "Tags Deleted Successfully!!!"
            });
        }
        return false;
    }
    if (!TagId) {
        return true;
    }
    res.status(400).json({ errors: "Tag Doesn't Exists" });
};