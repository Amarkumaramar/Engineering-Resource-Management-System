import User from "../models/User.js";
import Project from "../models/Project.js";

export const searchData = async (req, res) => {
  try {
    const { type, query } = req.query;

    if (!type || !query) {
      return res.status(400).json({ message: "Type and query are required" });
    }

    const keywordRegex = new RegExp(query, "i"); // ✅ Partial & case-insensitive match
    let results = [];

    if (type === "engineer") {
      results = await User.find({
        role: "engineer",
        $or: [
          { name: keywordRegex },         // Match engineer name
          { department: keywordRegex },   // Match department
          {skills: { $elemMatch: { $elemMatch: { $regex: keywordRegex } } }  }   // Match skills array
        ]
      });
      
    } 
    else if (type === "project") {
      results = await Project.find({
        $or: [
          { name: keywordRegex },         // Match project name
          { description: keywordRegex },  // Match description
          { status: keywordRegex }        // Match status
        ]
      }).populate("managerId", "name email"); // ✅ Also return manager details
    } 
    else {
      return res.status(400).json({ message: "Invalid search type" });
    }

    res.json(results);
  } catch (err) {
    console.error("Search error:", err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};