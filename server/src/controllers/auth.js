import User from "../models/UserInfo.js";

/* REGISTER USER */
export const register = async (req, res) => {
    try {
        const { UserName, Email, Password } = req.body;

        // const salt = await bcrypt.genSalt();
        // const passwordHash = await bcrypt.hash(password, salt);

        const UserId = Math.floor(Math.random() * 10000)
        const CreatedBy = UserId;

        const newUser = new User({
            UserId,
            UserName,
            Email,
            Password,
            CreatedBy,
        });
        const savedUser = await newUser.save();

        console.log(savedUser);
        res.status(201).json(savedUser);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};