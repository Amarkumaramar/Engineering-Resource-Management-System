import express from "express";
import { searchData } from "../controllers/searchController.js";

const router = express.Router();

// GET /search?type=engineer&query=react
router.get("/", searchData);

export default router;