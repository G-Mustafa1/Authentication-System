import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();
import userRouter from "./routes/userRouter.js";
import taskRouter from "./routes/taskRouter.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: ["https://authentication-system-khaki.vercel.app", "http://localhost:5173"],
    credentials: true,
  })
);
app.use("/user", userRouter);
app.use("/task", taskRouter);

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

app.get("/about", (req, res) => {
  res.send("About route 🎉");
});

export default app;