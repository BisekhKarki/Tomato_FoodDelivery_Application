import express from "express";
import {
  addFoood,
  listFood,
  removeFood,
} from "../controllers/FoodController.js";
import multer from "multer";

const foodRouter = express.Router();

// Image Storage Engine

const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

// Post Route
foodRouter.post("/add", upload.single("image"), addFoood);
foodRouter.get("/list", listFood);
foodRouter.post("/remove", removeFood);
export default foodRouter;
