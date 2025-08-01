import { useForm } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import API from "../../services/api";

export default function CreateAssignment() {
  const { register, handleSubmit, reset } = useForm();
  const queryClient = useQueryClient();

  const { data: engineers } = useQuery({
    queryKey: ["engineers"],
    queryFn: async () => {
      const res = await API.get("/engineers");
      return res.data;
    },
  });

  const { data: projects } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const res = await API.get("/projects");
      return res.data;
    },
  });

  // ✅ Updated invalidateQueries for v5
  const mutation = useMutation({
    mutationFn: (data: any) => API.post("/assignments", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["assignments"] });
      reset();
      alert("Assignment created successfully!");
    },
  });

  const onSubmit = (data: any) => mutation.mutate(data);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Create Assignment</h2>

      <div className="card max-w-lg mx-auto">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Engineer Dropdown */}
          <div>
            <label className="form-label">Select Engineer</label>
            <select {...register("engineerId")} className="input-field">
              <option value="">-- Choose Engineer --</option>
              {engineers?.map((eng: any) => (
                <option key={eng._id} value={eng._id}>
                  {eng.name} ({eng.department})
                </option>
              ))}
            </select>
          </div>

          {/* Project Dropdown */}
          <div>
            <label className="form-label">Select Project</label>
            <select {...register("projectId")} className="input-field">
              <option value="">-- Choose Project --</option>
              {projects?.map((proj: any) => (
                <option key={proj._id} value={proj._id}>
                  {proj.name}
                </option>
              ))}
            </select>
          </div>

          {/* Allocation Percentage */}
          <div>
            <label className="form-label">Allocation %</label>
            <input
              {...register("allocationPercentage")}
              type="number"
              className="input-field"
              placeholder="Enter allocation percentage"
            />
          </div>

          {/* Role */}
          <div>
            <label className="form-label">Role</label>
            <input
              {...register("role")}
              className="input-field"
              placeholder="e.g., Developer, Tech Lead"
            />
          </div>

          {/* Start Date */}
          <div>
            <label className="form-label">Start Date</label>
            <input {...register("startDate")} type="date" className="input-field" />
          </div>

          {/* End Date */}
          <div>
            <label className="form-label">End Date</label>
            <input {...register("endDate")} type="date" className="input-field" />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="btn-primary px-6 py-2 rounded text-white"
            >
              Create Assignment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
