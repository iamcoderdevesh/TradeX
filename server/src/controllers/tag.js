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

            const TagId = Math.floor(Math.random() * 10000);
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