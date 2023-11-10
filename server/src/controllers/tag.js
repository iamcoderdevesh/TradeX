import { validationResult } from 'express-validator';
import Tags from "../models/tags.js";

/* Creating Tags */
export const CreateTag = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    else {
        try {
            const { UserId, TagName, TagType, TagDesc } = req.body;
            
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

        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
};