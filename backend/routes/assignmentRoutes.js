import express from "express";
import { getAssignments, createAssignment, updateAssignment, deleteAssignment } from "../controllers/assignmentController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getAssignments);
router.post("/", protect, createAssignment);
router.put("/:id", protect, updateAssignment);
router.delete("/:id", protect, deleteAssignment);

export default router;
