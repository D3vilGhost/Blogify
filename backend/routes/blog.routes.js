import express from "express";
import Blog from "../model/blog.model.js";
import protectRoute from "../utils/protectRoute.js";
import { upload } from "../utils/fileUploader.js";
import uploadOnCloudinary from "../utils/cloudinary.js";

const router = express.Router();

// for new post
router.post(
  "/create",
  protectRoute,
  upload.single("coverImage"),
  createNewBlog
);
// to update already existing post
router.put(
  "/edit",
  protectRoute,
  upload.single("coverImage"),
  editExistingBlog
);
// get all the blogs for feed
router.get("/feed", getFeed);
// view a specific blog
router.get("/:blogId", getSpecificBlog);

async function createNewBlog(req, res) {
  try {
    const { title, summary, content } = req.body;
    // req.username is set by protectRoute
    const author = req.username;
    // req.file is coming from fileUploader
    // req.file contains coverImage's data
    const localImagePath = req.file.path;
    // unique blogid = author+timestamp
    const blogId = author + Date.now().toString();
    // passing the blogId as fileName of image
    // it will help to maintain uniqeness of image name
    // no extension as cloudinary will do it automatically
    const fileURL = await uploadOnCloudinary(localImagePath, blogId);
    const currentDate = new Date();
    const formatedDate = `${currentDate.getDate()}/${
      1 + currentDate.getMonth()
      // 1 is added as it starts count from 0
      // typical javscript behaviour :)
    }/${currentDate.getFullYear()}`;
    const newBlog = new Blog({
      title,
      summary,
      content,
      coverImage: fileURL,
      author,
      blogId,
      date: formatedDate,
    });
    if (newBlog) {
      await newBlog.save();
      res
        .status(201)
        .json({ message: "Blog Posted Successfully!", blogId: blogId });
    } else {
      res.status(400).json({ error: "Invalid Blog Data" });
    }
  } catch (error) {
    console.log("Error in createNewBlog :", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function editExistingBlog(req, res) {
  try {
  } catch (error) {}
}
async function getFeed(req, res) {
  try {
    const allBlogs = await Blog.find().sort({ date: 1 });
    return res.status(200).json(allBlogs);
  } catch (error) {
    console.log("Error in getFeed :", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
async function getSpecificBlog(req, res) {
  try {
    const blogId = req.params.blogId;
    const blogData = await Blog.findOne({ blogId }, "-_id -__v -blogId");
    if (!blogData) {
      return res.status(400).json({ error: "No such blog found !" });
    }
    return res.status(200).json(blogData);
  } catch (error) {
    console.log("Error in getSpecificBlog :", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
export default router;
