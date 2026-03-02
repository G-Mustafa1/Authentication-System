    import Task from "../models/TaskSchema.js";


    export const createTask = async (req, res) => {
        try {
            const userId = req.user._id
            if (!userId) {
                return res.status(401).json({ success: false, error: "Not authenticated" });
            }
            const { title, description } = req.body;

            if (!title || !description) {
                return res.status(400).json({ success: false, error: "All fields are required" });
            }

            const task = await Task.create({
                userId,
                title,
                description
            })
            res.status(200).json({ success: true, message: "Task created successfully", task });
        } catch (error) {
            res.status(500).json({ success: false, message: "Server error", error: error.message });
        }
    }

    export const getTask = async (req, res) => {
        const userId = req.user._id;
        try {
            const tasks = await Task.find({ userId });
            res.status(200).json({ success: true, message: "Tasks fetched successfully", tasks });
        } catch (error) {
            res.status(500).json({ success: false, message: "Server error", error: error.message });
        }
    }

    export const deleteTask = async (req, res) => {
        // const userId = req.user._id;
        const taskId = req.params.id;
        console.log("Deleting task ID:", taskId);

        try {
            const task = await Task.findOneAndDelete({ _id: taskId });
            if (!task) {
                return res.status(404).json({ success: false, message: "Task not found or not yours" });
            }
            res.status(200).json({ success: true, message: "Task deleted successfully", task });
        } catch (error) {
            res.status(500).json({ success: false, message: "Server error", error: error.message });
        }
    };

    export const updateTask = async (req, res) => {
        const taskId = req.params.id;
        const { title, description } = req.body;
        try {
            const task = await Task.findOneAndUpdate({ _id: taskId}, { title, description });
            if (!task) {
                return res.status(404).json({ success: false, message: "Task not found" });
            }
            res.status(200).json({ success: true, message: "Task updated successfully", task });
        } catch (error) {
            res.status(500).json({ success: false, message: "Server error", error: error.message });
        }
    }