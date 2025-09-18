import express from "express";

import {
  getUsers,
  loginUser,
  signupUser,
} from "../controllers/user.controller.js";
import upload from "../middleware/upload.js";

const router = express.Router();

// router.get('/', authenticate, authorize('admin', 'manager'), getUsers);
router.get("/", getUsers);
router.post("/signup", upload.single("photo"), signupUser);
router.post("/login", loginUser);

export default router;
