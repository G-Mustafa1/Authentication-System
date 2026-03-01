
import express from "express"
import dotenv from "dotenv"
const app = express()
dotenv.config()
import userRouter from "./routes/userRouter.js"
import connectDB from "./config/db.js"
import cookiesParser from "cookie-parser"
import cors from "cors"


app.use(express.json())
app.use(cookiesParser())

connectDB()

app.use(cors({
  origin: [process.env.BASE_URL,],
  credentials: true,
})
);

app.use('/user', userRouter)

app.get('/', (req, res) => {
  res.send('Backend is running 🚀')
})

app.get('/about', (req, res) => {
  res.send('About route 🎉')
})


export default app