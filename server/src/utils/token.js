import jwt from "jsonwebtoken";
import UserToken from "../models/userToken.js";

const generateTokens = async (UserInfo) => {
  try {
    const { UserId } = UserInfo;
    const payload = { id: UserId };

    const refreshToken = jwt.sign(
      payload,
      process.env.REFRESH_TOKEN,
      { expiresIn: "7d" }
    );

    const authToken = jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "10m" }
    );

    const userToken = await UserToken.deleteOne({ UserId });

    const newToken = new UserToken({
      UserId,
      Token: authToken,
      CreatedBy: UserId
    });

    await newToken.save();
    return { authToken, refreshToken };
  } catch (err) {
    return err;
  }
};

export default generateTokens;