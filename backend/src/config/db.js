import mongoose from "mongoose";
import dns from "dns";

dns.setServers(["8.8.8.8", "8.8.4.4"]);

const connectDB = async () => {  
  try {
    await mongoose.connect(process.env.MONGO_URL);

    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);
    process.exit(1);
  }
};

export default connectDB;