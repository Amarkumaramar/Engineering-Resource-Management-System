import User from "../models/User.js";
import Assignment from "../models/Assignment.js";

export const getEngineers = async (req, res) => {
  try {
    const engineers = await User.find({ role: "engineer" });
    res.json(engineers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getEngineerCapacity = async (req, res) => {
  try {
    const engineerId = req.params.id;
    const engineer = await User.findById(engineerId);
    const assignments = await Assignment.find({ engineerId });
    const totalAllocated = assignments.reduce((sum, a) => sum + a.allocationPercentage, 0);
    const availableCapacity = engineer.maxCapacity - totalAllocated;
    res.json({ availableCapacity });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
