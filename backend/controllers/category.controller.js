import db from "../models/index.js";

const { Category } = db;

export const registerCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const category = await Category.create({
      name,
      description,
    });
    res.status(201).json({
      success: true,
      message: "category added",
      category: {
        name,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getCategory = async (req, res) => {
  try {
    const category = await Category.findAll();
    res.status(200).json({
      succss: true,
      message: "found category",
      category,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
