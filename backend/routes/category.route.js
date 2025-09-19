import express from "express";
import {
  deleteCategory,
  getCategories,
  registerCategory,
  updateCategory,
} from "../controllers/category.controller.js";

const router = express.Router();

router.post("/", registerCategory);
router.get("/", getCategories);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);

export default router;
