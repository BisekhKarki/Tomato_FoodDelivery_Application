import express from "express";
import {
  addToCart,
  removeFromCart,
  getCart,
} from ".././controllers/CartController.js";
import authMiddleware from "../middleware/Auth.js";

const cartRouter = express.Router();

cartRouter.post("/add", authMiddleware, addToCart);
cartRouter.post("/remove", authMiddleware, removeFromCart);
cartRouter.get("/get", authMiddleware, getCart);

export default cartRouter;
