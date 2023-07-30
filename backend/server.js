import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();
connectDB();
const app = express();
const port = process.env.PORT || 5000;

// Enable CORS middleware
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5173");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.get("/", (req, res) => {
  res.send("HELLLOOO");
});

app.use(
  cors({
    methods: "GET,POST,PATCH,DELETE,OPTIONS",
    optionsSuccessStatus: 200,
    origin: "http://localhost:5173",
  })
);
app.options("*", cors());

app.use("/api/products", productRoutes);
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`listening to port: ${port}`));
