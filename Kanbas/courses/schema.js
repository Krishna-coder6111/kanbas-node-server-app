import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  instructor: String,
  startDate: Date,
  endDate: Date,
});

export default courseSchema;
