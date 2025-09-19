import category from "../models/category.js";
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
      message: "category  added Successfully",
      category,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const getCategories = async (req, res) => {
  try {
    const category = await Category.findAll();
    res.status(200).json({
      succss: true,
      category,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const getCategory = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category)
      return res.status(404).json({ message: "Category not found" });
    res.json({ success: true, category });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const category = await Category.findByPk(categoryId);
    if (!category)
      return res.status(404).json({ message: "Category not found" });

    const { name, description } = req.body;
    await category.update({ name, description });
    res
      .status(200)
      .json({ success: true, message: "Category updated Successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const category = await Category.findByPk(categoryId);
    if (!category)
      return res.status(404).json({ message: "Category not found" });

    await category.destroy();
    res
      .status(200)
      .json({ success: true, message: "category Deleted Sucessfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: err.message });
  }
};
