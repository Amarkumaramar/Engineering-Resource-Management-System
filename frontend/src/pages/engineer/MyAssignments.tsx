import { useQuery } from "@tanstack/react-query";
import API from "../../services/api";

export default function MyAssignments() {
  const engineerId = localStorage.getItem("userId"); // Retrieved after login

  // Fetch assignments
  const { data: assignments, isLoading } = useQuery({
    queryKey: ["assignments"],
    queryFn: async () => {
      const res = await API.get("/assignments");
      return res.data;
    },
  });

  if (isLoading) return <div>Loading my assignments...</div>;

  // Filter assignments for the logged-in engineer
  const myAssignments = assignments?.filter(
    (a: any) => a.engineerId._id === engineerId
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">My Assignments</h2>

      {myAssignments?.length === 0 ? (
        <div className="card text-center py-6 text-gray-500">
          No assignments found.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myAssignments?.map((a: any) => (
            <div key={a._id} className="card">
              {/* Project Name */}
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold">{a.projectId.name}</h3>
                <span className="badge bg-blue-500">{a.role}</span>
              </div>

              {/* Project Skills */}
              <div className="flex flex-wrap gap-2 mb-3">
                {a.projectId.requiredSkills.map((skill: string, idx: number) => (
                  <span
                    key={idx}
                    className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Timeline */}
              <div className="text-sm text-gray-600 mb-2">
                📅 {new Date(a.startDate).toLocaleDateString()} →{" "}
                {new Date(a.endDate).toLocaleDateString()}
              </div>

              {/* Allocation */}
              <div className="text-sm text-gray-700 font-medium mb-2">
                ⚡ Allocation: {a.allocationPercentage}%
              </div>

              {/* Progress Bar */}
              <div className="progress-container">
                <div
                  className="progress-bar"
                  style={{ width: `${a.allocationPercentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
