import { validationResult } from 'express-validator';
import Tags from "../models/tags.js";

/* Create/Update Tags */
export const CreateUpdateTag = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    else {
        try {
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
                    res.status(200).json({ TagId, TagName, TagType, TagDesc });
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
                res.status(201).send("Tag Created Successfully!!!");
            }

        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
};