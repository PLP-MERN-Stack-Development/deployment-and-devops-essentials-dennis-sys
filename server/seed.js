import mongoose from "mongoose";
import dotenv from "dotenv";
import Category from "./models/Category.js";

dotenv.config();

const seedCategories = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    await Category.deleteMany({});
    await Category.insertMany([
      { name: "Technology" },
      { name: "Life" },
      { name: "Travel" }
    ]);

    console.log("Categories seeded successfully");
    mongoose.disconnect();
  } catch (err) {
    console.error("Error seeding categories:", err);
  }
};

seedCategories();
