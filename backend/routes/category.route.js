import express from "express";
import {
  getCategories,
  registerCategory,
  updateCategory,
} from "../controllers/category.controller.js";

const router = express.Router();

router.post("/", registerCategory);
router.get("/", getCategories);
router.get("/:id", updateCategory);

export default router;
