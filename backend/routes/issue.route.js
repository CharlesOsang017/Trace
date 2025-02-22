import express from "express";
import { createIssue } from "../controllers/issue.controller.js";
import { admin } from "../middlewares/admin.middleware.js";
import { protectRoute } from "../middlewares/protect.middleware.js";

const router = express.Router();

router.post("/create", protectRoute, admin, createIssue);

export default router;
