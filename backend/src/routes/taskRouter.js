import express from "express";
import { protect } from "../middleware/middleware.js";
import { createTask, deleteTask, getTask, updateTask } from "../controllers/taskController.js";


const taskRouter = express.Router();

taskRouter.post("/add-task", protect, createTask );
taskRouter.get("/get-task", protect, getTask );
taskRouter.patch("/edit-task/:id", protect, updateTask );
taskRouter.delete("/delete-task/:id", protect, deleteTask );


export default taskRouter