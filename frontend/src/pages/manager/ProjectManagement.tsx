import { useForm } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import API from "../../services/api";
import { useState } from "react";

export default function ProjectManagement() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingProject, setEditingProject] = useState<any>(null);

  // Fetch projects
  const { data: projects, isLoading, isFetching } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const res = await API.get("/projects");
      return res.data;
    },
  });

  // Create project mutation
  const createMutation = useMutation({
    mutationFn: (data: any) => API.post("/projects", data),
    onMutate: () => setIsSubmitting(true),
    onSettled: () => setIsSubmitting(false),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      reset();
      setEditingProject(null);
    },
  });

  // Update project mutation
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: any) => API.patch(`/projects/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      setEditingProject(null);
    },
  });

  // Status update mutation
  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: any) => API.patch(`/projects/${id}`, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });

  const onSubmit = (data: any) => {
    const userData = JSON.parse(localStorage.getItem("user") || "{}");
    const formattedData = {
      ...data,
      requiredSkills: data.requiredSkills
        .split(",")
        .map((s: string) => s.trim()),
      managerId: userData?._id || null,
    };

    if (editingProject) {
      updateMutation.mutate({ id: editingProject._id, data: formattedData });
    } else {
      createMutation.mutate(formattedData);
    }
  };

  const handleEdit = (project: any) => {
    setEditingProject(project);
    reset({
      name: project.name,
      description: project.description,
      startDate: project.startDate?.split("T")[0],
      endDate: project.endDate?.split("T")[0],
      requiredSkills: project.requiredSkills?.join(", "),
      teamSize: project.teamSize,
      status: project.status,
    });
  };

  const handleStatusChange = (id: string, status: string) => {
    updateStatusMutation.mutate({ id, status });
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">🚀 Project Management</h2>

      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white rounded-xl shadow p-6 grid gap-4 md:grid-cols-2"
      >
        <div>
          <input
            {...register("name", { required: "Project name is required" })}
            placeholder="Project Name"
            className="border rounded-lg w-full p-2"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        <div className="md:col-span-2">
          <textarea
            {...register("description", { required: "Description is required" })}
            placeholder="Description"
            className="border rounded-lg w-full p-2"
          />
          {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
        </div>

        <div>
          <label className="text-sm text-gray-600">Start Date</label>
          <input
            {...register("startDate", { required: "Start date is required" })}
            type="date"
            className="border rounded-lg w-full p-2"
          />
        </div>

        <div>
          <label className="text-sm text-gray-600">End Date</label>
          <input
            {...register("endDate", { required: "End date is required" })}
            type="date"
            className="border rounded-lg w-full p-2"
          />
        </div>

        <div>
          <input
            {...register("requiredSkills", { required: "Skills are required" })}
            placeholder="Required Skills (comma separated)"
            className="border rounded-lg w-full p-2"
          />
        </div>

        <div>
          <input
            {...register("teamSize", { required: "Team size is required" })}
            type="number"
            placeholder="Team Size"
            className="border rounded-lg w-full p-2"
          />
        </div>

        <div>
          <select
            {...register("status", { required: "Status is required" })}
            className="border rounded-lg w-full p-2"
          >
            <option value="">Select Status</option>
            <option value="planning">Planning</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div className="md:col-span-2 flex justify-end">
          <button
            className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-lg flex items-center gap-2 disabled:opacity-60"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting && (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            )}
            {editingProject ? "Update Project" : "Add Project"}
          </button>
        </div>
      </form>

      {/* Projects Table */}
      <div className="mt-8 bg-white rounded-xl shadow overflow-hidden">
        {isLoading || isFetching ? (
          <div className="p-6 text-center text-gray-500">Loading projects...</div>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-3 border-b">Name</th>
                <th className="p-3 border-b">Skills</th>
                <th className="p-3 border-b">Status</th>
                <th className="p-3 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects?.map((proj: any) => (
                <tr key={proj._id} className="border-b hover:bg-gray-50 transition">
                  <td className="p-3">{proj.name}</td>
                  <td className="p-3">{proj.requiredSkills?.join(", ") || "-"}</td>
                  <td className="p-3 capitalize">
                    <select
                      value={proj.status}
                      onChange={(e) => handleStatusChange(proj._id, e.target.value)}
                      className="border rounded p-1 text-sm"
                    >
                      <option value="planning">Planning</option>
                      <option value="active">Active</option>
                      <option value="completed">Completed</option>
                    </select>
                  </td>
                  <td className="p-3 flex gap-2">
                    <button
                      onClick={() => handleEdit(proj)}
                      className="px-3 py-1 text-sm bg-blue-500 text-white rounded"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
