import jwt from "jsonwebtoken";
import User from "../model/user.model.js";

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(400).json({ error: "No Login" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      res.cookie("jwt", "", { maxAge: 0 });
      return res.status(400).json({ error: "Invalid Token" });
    }
    const user = await User.findOne({ username: decoded.username });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    // set username for further use
    req.username = decoded.username;
    next();
  } catch (error) {
    console.log("Error in protectRoute: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default protectRoute;
