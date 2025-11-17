import express from "express";
import { app } from "./socket/socket.js";
import dotenv from "dotenv";
import connectDB from "./db/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js"

dotenv.config();
const PORT = process.env.PORT;

const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get((req, res) => {
	res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`)
        });
    })
    .catch((err) => {
        console.log("connection failed", err)
    });


