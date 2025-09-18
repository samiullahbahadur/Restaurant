import express from "express";

import { getUsers } from "../controllers/user.controller.js";

const router = express.Router();

// router.get('/', authenticate, authorize('admin', 'manager'), getUsers);
router.get("/", getUsers);

export default router;
