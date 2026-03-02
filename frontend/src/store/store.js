import { configureStore } from "@reduxjs/toolkit"
import authSlice from "../features/authSlice"
import taskSlice from "../features/taskSlice"

const store = configureStore({
    reducer: {
        auth: authSlice,
        task: taskSlice
    }
})

export default store;