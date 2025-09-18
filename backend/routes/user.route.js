import express from "express";

import { getUsers, signupUser } from "../controllers/user.controller.js";
import upload from "../middleware/upload.js";

const router = express.Router();

// router.get('/', authenticate, authorize('admin', 'manager'), getUsers);
router.get("/", getUsers);
router.post("/signup", upload.single("photo"), signupUser);

export default router;
