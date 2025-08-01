import { useForm } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import API from "../../services/api";

export default function ProjectManagement() {
  const { register, handleSubmit, reset } = useForm();
  const queryClient = useQueryClient();

  // ✅ Updated useQuery for v5
  const { data: projects } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const res = await API.get("/projects");
      return res.data;
    },
  });

  // ✅ Updated mutation with proper invalidateQueries syntax
  const mutation = useMutation({
    mutationFn: (data: any) => API.post("/projects", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      reset();
    },
  });

  const onSubmit = (data: any) => {
    const formattedData = {
      ...data,
      requiredSkills: data.requiredSkills.split(",").map((s: string) => s.trim()),
    };
    mutation.mutate(formattedData);
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Project Management</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 mb-6">
        <input {...register("name")} placeholder="Project Name" className="border w-full p-2" />
        <input {...register("description")} placeholder="Description" className="border w-full p-2" />
        <input {...register("startDate")} type="date" className="border w-full p-2" />
        <input {...register("endDate")} type="date" className="border w-full p-2" />
        <input {...register("requiredSkills")} placeholder="Required Skills (comma separated)" className="border w-full p-2" />
        <input {...register("teamSize")} type="number" placeholder="Team Size" className="border w-full p-2" />
        <select {...register("status")} className="border w-full p-2">
          <option value="planning">Planning</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>
        <button className="bg-green-600 text-white py-2 px-4 rounded" type="submit">
          Add Project
        </button>
      </form>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th>Name</th>
            <th>Skills</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {projects?.map((proj: any) => (
            <tr key={proj._id} className="border-b">
              <td>{proj.name}</td>
              <td>{proj.requiredSkills.join(", ")}</td>
              <td>{proj.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
