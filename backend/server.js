import express from "express";
import path from "path";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectToMongoDb from "./util/connectToMongoDb.js";
import protectRoute from "./util/protectRoute.js";

import authRouter from "./routes/auth.routes.js";
import blogRouter from "./routes/blog.routes.js";

const __dirname = path.resolve();
dotenv.config();

const app = express.Router();
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/blog", protectRoute, blogRouter);
app.use("/api/", (req, res) => {
    res.redirect("/");
});

app.use(express.static(path.join(__dirname, "/frontend/dist")));
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/frontend/dist/index.html"));
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    connectToMongoDb();
    console.log(`Server Running on ${PORT}`);
});