import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

interface Engineer {
  _id: string;
  name: string;
  skills: string[];
}

interface Project {
  _id: string;
  name: string;
  requiredSkills: string[];
}

interface Gap {
  project: string;
  missingSkills: string[];
}

export default function SkillGapAnalysis() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [engineers, setEngineers] = useState<Engineer[]>([]);
  const [gaps, setGaps] = useState<Gap[]>([]);

  useEffect(() => {
    Promise.all([API.get("/projects"), API.get("/engineers")]).then(([projRes, engRes]) => {
      const projectList = projRes.data;
      const engineerList = engRes.data;

      setProjects(projectList);
      setEngineers(engineerList);

      const calculatedGaps = projectList.map((project: Project) => {
  const availableSkills = engineerList.flatMap((eng: Engineer) => eng.skills);
  const missingSkills = project.requiredSkills.filter(
    (skill: string) => !availableSkills.includes(skill)
  );

  return {
    project: project.name,
    missingSkills: missingSkills.length > 0 ? missingSkills : ["No gaps 🎉"],
  };
});
      setGaps(calculatedGaps);
    });
  }, []);

  return (
    <>
      <Navbar />
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">Skill Gap Analysis</h2>
        <div className="bg-white p-4 rounded shadow">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 text-left">Project</th>
                <th className="p-2 text-left">Missing Skills</th>
              </tr>
            </thead>
            <tbody>
              {gaps.map((gap, idx) => (
                <tr key={idx} className="border-t">
                  <td className="p-2">{gap.project}</td>
                  <td className="p-2">
                    {gap.missingSkills.join(", ")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
