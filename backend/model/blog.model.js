import mongoose from "mongoose"

const BlogSchema = new mongoose.Schema(
  {
    title: String,
    summary: String,
    content: String,
    coverImage: String,
    author: String,
    blogId: { type: String, required: true, unique: true },
    date: { type: String },
  },
  { timestamps: true }
)

const BlogModel = mongoose.model("Blog", BlogSchema)

export default BlogModel
