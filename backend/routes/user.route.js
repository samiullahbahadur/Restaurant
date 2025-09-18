import express from "express";

import { getUsers, signupUser } from "../controllers/user.controller.js";

const router = express.Router();

// router.get('/', authenticate, authorize('admin', 'manager'), getUsers);
router.get("/", getUsers);
router.post("/signup", signupUser);

export default router;
