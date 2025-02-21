import mongoose from "mongoose";

export const connectToDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to the Database");
  } catch (error) {
    console.log("Error connecting to the database", error.message);
  }
};
