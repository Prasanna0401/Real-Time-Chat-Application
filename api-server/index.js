import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { connectDB } from "./lib/db.js";
import { app, server } from "./lib/socket.js";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";

dotenv.config();

console.log("PORT:", process.env.PORT); // Debugging
console.log("MONGO_URI:", process.env.MONGO_URI); // Debugging

const PORT = process.env.PORT;
const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/messages", messageRoutes);

// if (process.env.NODE_ENV === "production") {
//     console.log("NODE_ENV is production — Serving frontend 🚀")
//     app.use(express.static(path.join(__dirname, "../frontend/dist")));

//     app.get("*", (req, res) => {
//         res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
//     });
// }

server.listen(PORT, () => {
    console.log("server is running on PORT:" + PORT);
    connectDB();
});
