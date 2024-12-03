import mongoose from "mongoose";
import { mongoDBConfig } from "../config/db.config";

const connectMongoDB = () => {
  mongoDBConfig.MONGO_URI
    ? mongoose.connect(mongoDBConfig.MONGO_URI)
    : console.log("MONGO_URI not defind");
  mongoose.connection.on("connected", () => {
    console.log("MongoDB connected");
  });
};

export default connectMongoDB;
