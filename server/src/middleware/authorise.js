import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
    try {
        const cookies = req.cookies;
        if (!cookies?.jwt) return res.status(401).json({ message: 'Unauthorized' })
        const token = cookies.jwt;

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.body.UserId = verified.id;
        
        next();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};