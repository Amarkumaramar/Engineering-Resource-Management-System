import mongoose from "mongoose";

const engineerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  skills: [String],
});

const Engineer = mongoose.model("Engineer", engineerSchema);

export default Engineer;  // ✅ Default export
