import express from "express";
import {
  getCategories,
  registerCategory,
} from "../controllers/category.controller.js";

const router = express.Router();

router.post("/", registerCategory);
router.get("/", getCategories);

export default router;
