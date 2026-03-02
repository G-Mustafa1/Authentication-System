import express from "express";
import { changePassword, forgotPasswordOTP, getUser, loginUser, logoutUser, registerUser, resetPasswordWithOTP, verification } from "../controllers/userController.js";
import { protect } from "../middleware/middleware.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.get("/verify/:token", verification);
userRouter.post("/login", loginUser);
userRouter.post("/logout", logoutUser);
userRouter.post("/forget-password", forgotPasswordOTP);
userRouter.post("/reset-password", resetPasswordWithOTP);
userRouter.post("/change-password", changePassword);
userRouter.get("/get-user", protect, getUser);
   
export default userRouter

