import foodModel from "../models/FoodModel.js";
import fs from "fs";

// Add food Item

const addFoood = async (req, res) => {
  console.log(req.file);
  console.log(req.body);
  if (!req.file) {
    return res
      .status(400)
      .json({ success: false, message: "No file uploaded" });
  }
  let image_filenae = `${req.file.filename}`;
  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: image_filenae,
  });

  try {
    await food.save();
    res.json({
      sucess: true,
      message: "Food Added",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error adding the food",
    });
  }
};

// All Food List
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ sucess: true, data: foods });
  } catch (error) {
    console.log(error);
    res.json({ sucess: false, message: "Error fectching the food" });
  }
};

// Remove Food Item
const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);
    fs.unlink(`uploads/${food.image}`, () => {});
    await foodModel.findByIdAndDelete(req.bod.id);
    res.json({ success: true, message: "Food removed successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error Removing food" });
  }
};

export { addFoood, listFood, removeFood };
