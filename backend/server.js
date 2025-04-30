import express from "express";
import connectDB from "./config/mongodb.js";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
import cookieParser from "cookie-parser";

import menuRoutes from "./routes/menuRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import { connectPostgresDB } from "./config/postgresSql.js";

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(cors());

const allowedOrigins = process.env.CORS_ORIGIN;

app.use(
  cors({
    origin: (origin, callback) => {
      console.log(`CORS Request Origin: ${origin}`); // Debug incoming origin
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.error(`CORS Error: Origin ${origin} not allowed`);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(cookieParser());

app.use("/api/user", userRoutes);
app.use("/menu", menuRoutes);
app.use("/cart", cartRoutes);
app.use("/order", orderRoutes);
async function startServer() {
  try {
    await connectDB();
    await connectPostgresDB();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to connect to databases:", err);
    process.exit(1);
  }
}

startServer();

// app.listen(PORT, () => {
//   connectDB();
//   connectPostgresDB();
//   console.log("Server is running on port 3000");
// });
