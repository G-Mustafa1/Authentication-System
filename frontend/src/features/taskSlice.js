import { api } from "@/api/api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = "/task"; // your backend task routes

// 1️⃣ Fetch tasks
export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`${API_URL}/get-task`, { withCredentials: true });
    //   console.log(data);
      return data.tasks;
      
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// 2️⃣ Create task
export const createTask = createAsyncThunk(
  "tasks/createTask",
  async (taskData, { rejectWithValue }) => {
    try {
      const { data } = await api.post(`${API_URL}/add-task`, taskData, { withCredentials: true });
      return data.task;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// 3️⃣ Update task
export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async ({ id, updates }, { rejectWithValue }) => {
    try {
      const { data } = await api.patch(`${API_URL}/edit-task/${id}`, updates, { withCredentials: true });
      return data.task;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// 4️⃣ Delete task
export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`${API_URL}/delete-task/${id}`, { withCredentials: true });
      return id; // return deleted id to remove from state
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Slice
const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch tasks
      .addCase(fetchTasks.pending, (state) => { state.loading = true; })
      .addCase(fetchTasks.fulfilled, (state, action) => { state.loading = false; state.tasks = action.payload; })
      .addCase(fetchTasks.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      // Create task
      .addCase(createTask.pending, (state) => { state.loading = true; })
      .addCase(createTask.fulfilled, (state, action) => { state.loading = false; state.tasks.unshift(action.payload); })
      .addCase(createTask.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      // Update task
      .addCase(updateTask.pending, (state) => { state.loading = true; })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = state.tasks.map((t) => t._id === action.payload._id ? action.payload : t);
      })
      .addCase(updateTask.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      // Delete task
      .addCase(deleteTask.pending, (state) => { state.loading = true; })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = state.tasks.filter((t) => t._id !== action.payload);
      })
      .addCase(deleteTask.rejected, (state, action) => { state.loading = false; state.error = action.payload; });
  },
});

export default taskSlice.reducer;