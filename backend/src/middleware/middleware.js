import jwt from "jsonwebtoken";
import { User } from "../models/UserSchema.js";

export const protect = async (req, res, next) => {
  try {
    const token = req.cookies.accessToken;    
    if (!token) {
      return res.status(401).json({
        success: false,
        error: "Unauthorized - No token",
      });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({
        success: false,
        error: "User not found",
      });
    }  

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      error: "Invalid or expired token",
    });
  }
};