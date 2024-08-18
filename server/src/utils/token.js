import jwt from "jsonwebtoken";
import UserToken from "../models/userToken.js";

const generateTokens = async (UserInfo) => {
  try {
    const { UserId } = UserInfo;
    const payload = { id: UserId };

    const refreshToken = jwt.sign(
      payload,
      process.env.REFRESH_TOKEN,
      { expiresIn: "24h" }
    );

    const authToken = jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    await UserToken.deleteOne({ UserId });

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