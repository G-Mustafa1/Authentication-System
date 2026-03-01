import { api } from "@/api/api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


// LOGIN 
export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (userData, { rejectWithValue }) => {
        try {
            const res = await api.post("/user/login", userData, {
                withCredentials: true,
            });
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.error || "Login failed");
        }
    }
);


// SIGNUP 
export const signupUser = createAsyncThunk(
    "auth/register",
    async (userData, { rejectWithValue }) => {
        try {
            const res = await api.post("/user/register", userData);
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.error || "Signup failed");
        }
    }
);


// LOGOUT 
export const logoutUser = createAsyncThunk(
    "auth/logout",
    async (_, { rejectWithValue }) => {
        try {
            const res = await api.post("/user/logout", {}, {
                withCredentials: true,
            });
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.error || "Logout failed");
        }
    }
);


// SEND OTP
export const sendOTP = createAsyncThunk(
    "auth/sendOTP",
    async (email, { rejectWithValue }) => {
        try {
            const res = await api.post("/user/forget-password", { email });
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.error || "OTP send failed");
        }
    }
);


// VERIFY OTP
export const verifyOTP = createAsyncThunk(
    "auth/verifyOTP",
    async ({ email, otp }, { rejectWithValue }) => {
        try {
            const res = await api.post("/user/reset-password", { email, otp });
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.error || "OTP verification failed");
        }
    }
);


// CHANGE PASSWORD
export const changePassword = createAsyncThunk(
    "auth/changePassword",
    async ({ email, newPassword, confirmPassword }, { rejectWithValue }) => {
        try {
            const res = await api.post("/user/change-password", {
                email,
                newPassword,
                confirmPassword,
            });
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.error || "Password change failed");
        }
    }
);

// GET USER
export const checkAuth = createAsyncThunk(
    "auth/checkAuth",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await api.get("/user/get-user", {
                withCredentials: true,
            });
            // console.log("user info", data);
            return data;
        } catch (err) {
            return rejectWithValue(err.response?.data || "Not authenticated");
        }
    }
);


// SLICE 
const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        loading: false,
        error: null,
        success: null,
        otpSuccess: null,
        isOtpVerified: false,
    },
    reducers: {
        clearState: (state) => {
            state.error = null;
            state.success = null;
            state.otpSuccess = null;
            state.loading = false;
            state.isOtpVerified = false;
        },
    },

    extraReducers: (builder) => {
        builder

            // LOGIN 
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.success = action.payload.message;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })


            // SIGNUP 
            .addCase(signupUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signupUser.fulfilled, (state, action) => {
                state.loading = false;
                state.success = action.payload.message;
            })
            .addCase(signupUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })


            // SEND OTP
            .addCase(sendOTP.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(sendOTP.fulfilled, (state, action) => {
                state.loading = false;
                state.otpSuccess = action.payload.message;
            })
            .addCase(sendOTP.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })


            // VERIFY OTP
            .addCase(verifyOTP.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(verifyOTP.fulfilled, (state, action) => {
                state.loading = false;
                state.isOtpVerified = true;
                state.success = action.payload.message;
            })
            .addCase(verifyOTP.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })


            // Change psss
            .addCase(changePassword.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(changePassword.fulfilled, (state, action) => {
                state.loading = false;
                state.success = action.payload.message;
            })
            .addCase(changePassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })


            // CHECK AUTH
            .addCase(checkAuth.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user || null;
            })
            .addCase(checkAuth.rejected, (state, action) => {
                state.loading = false;
                state.user = null;
                state.error = null;
                // state.error = action.payload.error;
            })


            // LOGOUT
            .addCase(logoutUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(logoutUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = null;
                state.success = action.payload.message || "Logged out successfully";
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    },
});

export const { clearState } = authSlice.actions;
export default authSlice.reducer;