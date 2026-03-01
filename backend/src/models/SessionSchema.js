import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema(
  {
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        // required: true
    }
  },
  {
    timestamps: true,
    collection: "sessions",
  }
);

const Session = mongoose.model("Session", sessionSchema);

export default Session;