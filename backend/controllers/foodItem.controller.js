import db from "../models/index.js";

const { FoodItem } = db;

export const registerFoodItem = async (req, res) => {
  try {
    const { name, description, price, availability, categoryId } = req.body;
    const photo = req.file ? `/images/${req.file.filename}` : null;
    const food = await FoodItem.create({
      name,
      description,
      price,
      availability,
      categoryId,
      photo,
    });
    res.status(200).json({
      success: true,
      message: " food added successfully",
      food,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
