import express from "express";
import { getEngineers, getEngineerCapacity } from "../controllers/engineerController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getEngineers);
router.get("/:id/capacity", protect, getEngineerCapacity);

export default router;
