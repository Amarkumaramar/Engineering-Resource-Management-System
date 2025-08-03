# 🚀 Engineering Resource Management System

A full-stack application to manage engineering team assignments across projects. This system helps managers allocate engineers based on skills and available capacity while allowing engineers to view their assignments.

---

## 📌 Features

- **Authentication & Roles:** Login for Manager and Engineer
- **Engineer Management:** Profiles, skills, capacity tracking
- **Project Management:** Create, edit, and view projects
- **Assignments:** Allocate engineers with percentages
- **Capacity Tracking:** Real-time available workload
- **Search & Filter:** Find engineers by skills or project status
- **Dashboards:** Manager and Engineer views
- **Analytics:** Basic utilization charts

---

## 🛠️ Tech Stack

- **Frontend:** React, TypeScript, Tailwind CSS, ShadCN UI, Zustand
- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **Authentication:** JWT-based login
- **State Management:** React Context API or Zustand

---

## 📂 Project Structure

project-root/
│── backend/
│ ├── config/
│ │ └── db.js
│ ├── controllers/
| |    ├── assignmentController.js
│ │    ├── authController.js
│ │    ├── engineerController.js
│ │    ├── projectController.js
│ │    ├── searchController.js
│ ├── middleware/
│ │    ├── authMiddleware.js
│ ├── models/
│ │ ├── User.js
│ │ ├── Project.js
│ │ └── Assignment.js
│ │ └── Engineer.js
│ ├── routes/
│ │ ├── authRoutes.js
│ │ ├── engineerRoutes.js
│ │ ├── projectRoutes.js
│ │ ├── assignmentRoutes.js
│ │ └── searchRoutes.js
│ ├── seed/
│ │ └── seedData.js
│ ├── server.js
│ └── .env
│
│── frontend/
│ ├── src/
│ │ ├── components
│ │ | ├── AssignmentForm.tsx
│ │ | ├── CapacityBar.tsx
│ │ | ├── Navbar.tsx
│ │ ├── context
│ │ | ├── AuthContext.tsx
│ │ ├── hooks
│ │ | ├── useFetch.ts
│ │ ├── pages
│ │ | ├── engineer
│ │ | |  ├── MyAssignments.tsx
│ │ | |  ├── Profile.tsx
│ │ | ├── manager
│ │ | |  ├── CreateAssignment.tsx
│ │ | |  ├── ProjectManagement.tsx
│ │ | |  ├── SearchFilter.tsx
│ │ | |  ├── TeamOverview.tsx
│ │ | ├── Login.tsx
│ │ | ├── SearchResults.tsx
│ │ | ├── SkillGapAnalysis.tsx
│ │ | ├── TimelineView.tsx
│ │ ├── services
│ │ | ├── api.ts
│ | | ├── App.tsx
│ | | ├── index.css
│ | | ├── main.tsx
│ ├── package.json
│ └── ...

yaml
Copy
Edit

---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repository
```bash
git clone https://github.com/your-username/engineering-resource-management.git
cd engineering-resource-management


2️⃣ Backend Setup

cd backend
npm install
Run the database seed script:

node seed/seedData.js

npm start


3️⃣ Frontend Setup

cd ../frontend
npm install
npm run dev


🚀 Login Credentials (Sample Data)
Manager
Email: manager1@example.com

Password: password123

Engineer
Email: john@example.com

Password: password123

Email: jane@example.com

Password: password123

Email: sam@example.com

Password: password123


 AI Tools Used
ChatGPT / Claude: Used for code scaffolding and boilerplate generation

Cursor IDE: AI-powered coding suggestions

GitHub Copilot: Autocompletion and bug fixing

✅ AI Usage Examples:
Generated base CRUD routes for engineers and projects.

Suggested Mongoose schema structures for assignments.

Provided seed data script for quick testing.

⚠️ Challenges Faced:
AI-generated code required refactoring to match project-specific logic.

Adjusted API endpoints to handle capacity calculations correctly.

Manually validated and tested all AI-suggested code before production.

//Database Seed Script


---

# ✅ 2️⃣ Database Seed Script

Create a file: **`backend/seed/seedData.js`**

```javascript
import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/User.js";
import Project from "../models/Project.js";
import Assignment from "../models/Assignment.js";

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Database connected...");

    // Clear old data
    await User.deleteMany();
    await Project.deleteMany();
    await Assignment.deleteMany();

    // Sample Engineers
    const engineers = await User.insertMany([
      {
        email: "engineer1@example.com",
        name: "John Doe",
        role: "engineer",
        skills: ["React", "Node.js"],
        seniority: "mid",
        maxCapacity: 100,
        department: "Frontend",
      },
      {
        email: "engineer2@example.com",
        name: "Jane Smith",
        role: "engineer",
        skills: ["Python", "Django"],
        seniority: "senior",
        maxCapacity: 50,
        department: "Backend",
      },
      {
        email: "engineer3@example.com",
        name: "Robert Lee",
        role: "engineer",
        skills: ["Java", "Spring Boot"],
        seniority: "junior",
        maxCapacity: 100,
        department: "Backend",
      },
    ]);

    // Sample Manager
    const managers = await User.insertMany([
      {
        email: "manager1@example.com",
        name: "Alice Manager",
        role: "manager",
        skills: [],
        seniority: "senior",
        maxCapacity: 0,
        department: "Management",
      },
    ]);

    // Sample Projects
    const projects = await Project.insertMany([
      {
        name: "Website Redesign",
        description: "Frontend revamp for client website",
        startDate: new Date("2025-08-01"),
        endDate: new Date("2025-10-01"),
        requiredSkills: ["React"],
        teamSize: 2,
        status: "active",
        managerId: managers[0]._id,
      },
      {
        name: "AI Backend Service",
        description: "Developing APIs for AI service",
        startDate: new Date("2025-09-01"),
        endDate: new Date("2025-12-01"),
        requiredSkills: ["Python"],
        teamSize: 3,
        status: "planning",
        managerId: managers[0]._id,
      },
    ]);

    // Sample Assignments
    await Assignment.insertMany([
      {
        engineerId: engineers[0]._id,
        projectId: projects[0]._id,
        allocationPercentage: 60,
        startDate: new Date("2025-08-05"),
        endDate: new Date("2025-09-30"),
        role: "Frontend Developer",
      },
      {
        engineerId: engineers[1]._id,
        projectId: projects[1]._id,
        allocationPercentage: 50,
        startDate: new Date("2025-09-05"),
        endDate: new Date("2025-11-30"),
        role: "Backend Developer",
      },
    ]);

    console.log("✅ Seed data inserted successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error inserting seed data:", error);
    process.exit(1);
  }
};

seedData();


✅ How to Run Seed Script

cd backend
node seed/seedData.js


This will:

Connect to MongoDB

Clear previous data

Insert sample users, projects, and assignments.





