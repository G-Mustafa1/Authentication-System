import { api } from "@/api/api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = "/task";

/* ───────── FETCH ───────── */
export const fetchTasks = createAsyncThunk(
  "tasks/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`${API_URL}/get-task`, {
        withCredentials: true,
      });

      return data.tasks;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

/* ───────── CREATE ───────── */
export const createTask = createAsyncThunk(
  "tasks/create",
  async (taskData, { rejectWithValue }) => {
    try {
      const { data } = await api.post(
        `${API_URL}/add-task`,
        taskData,
        { withCredentials: true }
      );

      return data.task;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

/* ───────── UPDATE ───────── */
export const updateTask = createAsyncThunk(
  "tasks/update",
  async ({ id, updates }, { rejectWithValue }) => {
    try {
      const { data } = await api.put(
        `${API_URL}/edit-task/${id}`,
        updates,
        { withCredentials: true }
      );

      return data.task;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

/* ───────── DELETE ───────── */
export const deleteTask = createAsyncThunk(
  "tasks/delete",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`${API_URL}/delete-task/${id}`, {
        withCredentials: true,
      });

      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

/* ───────── SLICE ───────── */
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
      /* FETCH */
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* CREATE */
      .addCase(createTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks.unshift(action.payload);
      })
      .addCase(createTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* UPDATE (FIXED) */
      .addCase(updateTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = state.tasks.map((t) =>
          t._id === action.payload._id ? action.payload : t
        );
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* DELETE */
      .addCase(deleteTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = state.tasks.filter(
          (t) => t._id !== action.payload
        );
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default taskSlice.reducer;