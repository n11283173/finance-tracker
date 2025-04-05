import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import transactionRoutes from "./routes/transactionRoute.js";

dotenv.config();

const app = express();

// Middleware
// Add request logging middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    console.log("Request body:", req.body);
    next();
});

// Enhanced CORS configuration
app.use(
    cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type"],
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Debug middleware
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    console.log("Headers:", req.headers);
    console.log("Body:", req.body);
    next();
});
// Health check route
app.get("/", (req, res) => {
    res.status(200).json({ message: "API is running" });
});

// Routes
app.use("/api/transactions", transactionRoutes);

// DB connection and server start
const PORT = process.env.PORT || 5000;

//MongoDB connection
mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: "finance-tracker",
    })
    .then(() => {
        console.log("MongoDB connected ✅");
        console.log("MongoDB URI:", process.env.MONGO_URI); // Add this line

        app.listen(PORT, () => {
            console.log(`🚀 Server running on http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error("❌ MongoDB Connection Error:", err);
        process.exit(1);
    });
