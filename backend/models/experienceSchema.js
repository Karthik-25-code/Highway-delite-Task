import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    about: { type: String, required: true },
    location: { type: String, required: true },
    image: { type: String, required: false }, // store file path or URL
    dates: [
      {
        date: { type: String, required: true },
        times: { type: [String], required: true, default: [] }
      }
    ],
    cost: { type: Number, required: true, min: 0 }
  },
  { timestamps: true }
);

const Experience = mongoose.model("Experience", experienceSchema);
export default Experience;
