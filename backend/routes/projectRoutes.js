
import express from "express";
import { getProjects, createProject, updateProject } from "../controllers/projectController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getProjects);
router.post("/", protect, createProject);
router.patch("/:id", protect, updateProject); 

export default router;
