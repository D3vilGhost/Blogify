import express from "express";
import Blog from "../model/blog.model.js";

const router = express.Router();

// for new post
router.post("/post/new", addNewBlog);
// to update already existing post
router.put("/post/update", updateExistingBlog);
// get all the blogs for feed
router.get("/all", viewAllBlog);
// view a specific blog
router.get("/:blogId", getSpecificBlog);

async function addNewBlog(req, res) {
    try {
        const { title, summary, content, cover, author } = req.body;
        // unique blogid = author+timestamp
        const blogId = author + Date.now().toString();
        const newBlog = new Blog({
            title,
            summary,
            content,
            cover,
            author,
            blogId,
        });
        if (newBlog) {
            await newBlog.save();
            res.status(201).json({ message: "Blog Posted Successfully!" });
        } else {
            res.status(400).json({ error: "Invalid Blog Data" });
        }
    } catch (error) {
        console.log("Error in addNewBlog :", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
async function updateExistingBlog(req, res) {
    try {} catch (error) {}
}
async function viewAllBlog(req, res) {
    try {
        const allBlogs = await Blog.find();
        if (!allBlogs) {}
    } catch (error) {
        console.log("Error in updateExistingBlog :", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
async function getSpecificBlog(req, res) {
    try {
        const { blogId } = req.param.blogId;
        const blog = await Blog.findOne({ blogId });
        if (!blog) {
            res.redirect("/");
        }
        // how to send web page with data?
    } catch (error) {
        console.log("Error in getSpecificBlog :", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}