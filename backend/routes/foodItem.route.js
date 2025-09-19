import express from "express";
import { registerFoodItem } from "../controllers/foodItem.controller.js";

const router = express.Router();
router.post("/", registerFoodItem)
export default router;
