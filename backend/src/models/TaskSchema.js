import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        title: {
            type: String,
            required: [true, "Task title is required"],
            trim: true,
        },
        description: {
            type: String,
            trim: true,
        },
        status: {
            type: String,
            enum: ["pending", "in-progress", "completed"],
            default: "pending",
        },
    },
    {
        timestamps: true,
        collection: "tasks",
    }
);

const Task = mongoose.model("Task", taskSchema);

export default Task;