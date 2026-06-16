import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
import app from "./src/app.js";
dotenv.config();


const port = process.env.PORT || 3000;

connectDB();

app.listen(port, () => {
  console.log(`🚀 Server running on ${port}`);  
});    