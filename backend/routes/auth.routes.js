import express from "express";
import User from "../model/user.model.js";
import Blog from "../model/blog.model.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";
import protectRoute from "../utils/protectRoute.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
// protectRoute cuz user need to be loggedin before
// accessing profile also username is set by the protectRoute
router.get("/profile", protectRoute, getProfile);

// signup controller
async function signup(req, res) {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ error: "Username already exists" });
    }
    const newUser = new User({ username, password });
    if (newUser) {
      generateTokenAndSetCookie(newUser.username, res);
      await newUser.save();
      res.status(201).json({
        username: newUser.username,
      });
    } else {
      res.status(400).json({ error: "Invalid User Data" });
    }
  } catch (error) {
    console.log("Error in signup:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// login controller
async function login(req, res) {
  try {
    const { username, password } = req.body;
    const userDoc = await User.findOne({ username });
    if (!userDoc) {
      return res.status(400).json({ error: "Invalid Username" });
    }
    if (userDoc.password != password) {
      return res.status(400).json({ error: "Invalid Password" });
    }
    generateTokenAndSetCookie(userDoc.username, res);
    res.status(200).json({
      username: userDoc.username,
    });
  } catch (error) {
    console.log("Error in login:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// logout controller
function logout(req, res) {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged Out Successfully!" });
  } catch (error) {
    console.log("Error in logout:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Profile Controller
async function getProfile(req, res) {
  try {
    const username = req.username;
    // fetch all blogs
    const allBlogsOfUser = await Blog.find(
      { author: username },
      "title summary blogId"
    );
    if (!allBlogsOfUser || allBlogsOfUser.length == 0) {
      // if there are no blogs send an empty array
      return res.status(201).json([]);
    }
    // else return blogs list
    return res.status(201).json(allBlogsOfUser);
  } catch (error) {
    console.log("Error in getProfile:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
export default router;
