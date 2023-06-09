import mongoose, { Schema } from "mongoose";

const NewsSchema = new Schema(
  {
    title: { type: String, required: true },
    short_description: { type: String, required: true },
    description: { type: String, required: true },
    thumbnail: { type: String },
    news_category: { type: [String] },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("news", NewsSchema);
