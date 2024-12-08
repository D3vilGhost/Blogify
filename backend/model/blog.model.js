import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema(
  {
    title: String,
    summary: String,
    content: String,
    coverImage: String,
    author: { type: Schema.Types.ObjectId, ref: "User" },
    blogId: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  }
);

const BlogModel = mongoose.model("Blog", BlogSchema);

export default BlogModel;
