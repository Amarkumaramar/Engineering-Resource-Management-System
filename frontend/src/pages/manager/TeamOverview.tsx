import { useQuery } from "@tanstack/react-query";
import API from "../../services/api";

export default function TeamOverview() {
  // Fetch engineers
  const { data: engineers, isLoading } = useQuery({
    queryKey: ["engineers"],
    queryFn: async () => {
      const res = await API.get("/engineers");
      return res.data;
    },
  });

  // Fetch assignments for capacity calculation
  const { data: assignments } = useQuery({
    queryKey: ["assignments"],
    queryFn: async () => {
      const res = await API.get("/assignments");
      return res.data;
    },
  });

  if (isLoading) return <div>Loading team data...</div>;

  // Calculate available capacity
  const getAvailableCapacity = (engineerId: string, maxCap: number) => {
    const assigned = assignments
      ?.filter((a: any) => a.engineerId._id === engineerId)
      .reduce((sum: number, a: any) => sum + a.allocationPercentage, 0) || 0;
    return Math.max(0, maxCap - assigned);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Team Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {engineers?.map((eng: any) => {
          const available = getAvailableCapacity(eng._id, eng.maxCapacity);
          const allocated = eng.maxCapacity - available;

          return (
            <div key={eng._id} className="card">
              {/* Header */}
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold">{eng.name}</h3>
                <span
                  className={`badge ${
                    allocated >= 90
                      ? "bg-red-500"
                      : allocated >= 50
                      ? "bg-yellow-500"
                      : "bg-green-500"
                  }`}
                >
                  {allocated}% Used
                </span>
              </div>

              {/* Department and Seniority */}
              <p className="text-sm text-gray-600 mb-2">
                {eng.department} • {eng.seniority}
              </p>

              {/* Skills */}
              <div className="flex flex-wrap gap-2 mb-3">
                {eng.skills.map((skill: string, idx: number) => (
                  <span
                    key={idx}
                    className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Capacity Progress */}
              <div className="text-sm text-gray-700 mb-1">
                Available: {available}%
              </div>
              <div className="progress-container">
                <div
                  className="progress-bar"
                  style={{
                    width: `${allocated}%`,
                    backgroundColor:
                      allocated >= 90
                        ? "#dc2626"
                        : allocated >= 50
                        ? "#f59e0b"
                        : "#2563eb",
                  }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
