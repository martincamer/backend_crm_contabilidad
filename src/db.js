import mongoose from "mongoose";
import { MONGO_URL } from "./config.js";

export async function connectDB() {
  if (!MONGO_URL) {
    throw new Error("Please add the MONGO_URL environment variable");
  }

  mongoose.connect(MONGO_URL);

  const database = mongoose.connection;

  database.on(
    "error",
    console.error.bind(console, "❌ mongodb connection error")
  );

  database.once("open", () => console.log("✅ mongodb connected successfully"));
}
