import express from 'express'
import { getCategory, registerCategory } from '../controllers/category.controller.js';

const router= express.Router()

router.post("/", registerCategory)
router.get("/", getCategory)

export default router;