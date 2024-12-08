import express from "express";
import User from "../models/user.model.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

//signup controller
async function signup(req, res) {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ error: "Username already exists" });
        }
        const newUser = new User({ username, password });
        if (newUser) {
            generateTokenAndSetCookie(newUser._id, res);
            await newUser.save();
            res.status(201).json({
                _id: newUser._id,
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

//login controller
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
        generateTokenAndSetCookie(userDoc._id, res);
        res.status(200).json({
            _id: userDoc._id,
            username: userDoc.username,
        });
    } catch (error) {
        console.log("Error in login:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

//logout controller
function logout(req, res) {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged Out Successfully!" });
    } catch (error) {
        console.log("Error in logout:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
export default router;