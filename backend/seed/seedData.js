import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import Project from "../models/Project.js";
import Assignment from "../models/Assignment.js";
import connectDB from "../config/db.js";

dotenv.config();

const seedData = async () => {
  try {
    await connectDB();

    // Clear existing data
    await User.deleteMany();
    await Project.deleteMany();
    await Assignment.deleteMany();

    // Hash password
    const hashedPassword = await bcrypt.hash("password123", 10);

    // Create Managers
    const manager = await User.create({
      email: "manager@example.com",
      password: hashedPassword,
      name: "Alice Johnson",
      role: "manager",
      department: "Engineering",
    });

    // Create Engineers
    const engineers = await User.insertMany([
      {
        email: "john@example.com",
        password: hashedPassword,
        name: "John Doe",
        role: "engineer",
        skills: ["React", "Node.js"],
        seniority: "mid",
        maxCapacity: 100,
        department: "Frontend",
      },
      {
        email: "jane@example.com",
        password: hashedPassword,
        name: "Jane Smith",
        role: "engineer",
        skills: ["Python", "Django", "MongoDB"],
        seniority: "senior",
        maxCapacity: 50,
        department: "Backend",
      },
      {
        email: "sam@example.com",
        password: hashedPassword,
        name: "Sam Wilson",
        role: "engineer",
        skills: ["React", "Next.js", "Tailwind"],
        seniority: "junior",
        maxCapacity: 100,
        department: "Frontend",
      },
    ]);

    // Create Projects
    const projects = await Project.insertMany([
      {
        name: "Website Revamp",
        description: "Revamp company website with new UI",
        startDate: new Date("2025-08-05"),
        endDate: new Date("2025-09-15"),
        requiredSkills: ["React", "Tailwind"],
        teamSize: 3,
        status: "active",
        managerId: manager._id,
      },
      {
        name: "API Development",
        description: "Build REST APIs for mobile application",
        startDate: new Date("2025-08-01"),
        endDate: new Date("2025-09-30"),
        requiredSkills: ["Node.js", "MongoDB"],
        teamSize: 2,
        status: "planning",
        managerId: manager._id,
      },
      {
        name: "AI Chatbot",
        description: "Develop an AI-based customer support chatbot",
        startDate: new Date("2025-08-10"),
        endDate: new Date("2025-10-10"),
        requiredSkills: ["Python", "Machine Learning"],
        teamSize: 2,
        status: "active",
        managerId: manager._id,
      },
    ]);

    // Create Assignments
    await Assignment.insertMany([
      {
        engineerId: engineers[0]._id,
        projectId: projects[0]._id,
        allocationPercentage: 60,
        startDate: new Date("2025-08-05"),
        endDate: new Date("2025-09-01"),
        role: "Frontend Developer",
      },
      {
        engineerId: engineers[0]._id,
        projectId: projects[1]._id,
        allocationPercentage: 20,
        startDate: new Date("2025-08-20"),
        endDate: new Date("2025-09-30"),
        role: "API Developer",
      },
      {
        engineerId: engineers[1]._id,
        projectId: projects[2]._id,
        allocationPercentage: 50,
        startDate: new Date("2025-08-10"),
        endDate: new Date("2025-10-10"),
        role: "ML Engineer",
      },
      {
        engineerId: engineers[2]._id,
        projectId: projects[0]._id,
        allocationPercentage: 80,
        startDate: new Date("2025-08-05"),
        endDate: new Date("2025-09-10"),
        role: "Frontend Developer",
      },
      {
        engineerId: engineers[2]._id,
        projectId: projects[2]._id,
        allocationPercentage: 20,
        startDate: new Date("2025-09-11"),
        endDate: new Date("2025-10-10"),
        role: "Assistant Developer",
      },
      {
        engineerId: engineers[1]._id,
        projectId: projects[1]._id,
        allocationPercentage: 20,
        startDate: new Date("2025-08-15"),
        endDate: new Date("2025-09-10"),
        role: "Database Specialist",
      },
    ]);

    console.log("✅ Seed data inserted successfully");
    process.exit();
  } catch (error) {
    console.error("❌ Error seeding data:", error);
    process.exit(1);
  }
};

seedData();
