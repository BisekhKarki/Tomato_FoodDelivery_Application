import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/FoodRoute.js";
import userRouter from "./routes/UserRoute.js";
import cartRouter from "./routes/CartRoute.js";
import orderRouter from "./routes/OrderRoute.js";
// import "dotenv/config";

// App config
const app = express();
const port = 4000;

// middleware
app.use(express.json());
app.use(cors());

// Database connection
connectDB();

// Api endpoints
app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

app.get("/", (req, res) => {
  res.send("API Working");
});
// Running the backend server
app.listen(port, () => {
  console.log(`Server running at PORT: ${port}`);
});
