import mongoose from "mongoose";

const moduleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'CourseModel', required: true }
});

export default moduleSchema;
