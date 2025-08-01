import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
import API from "../../services/api";

export default function Profile() {
  const { user } = useAuth();
  const { register, handleSubmit, setValue } = useForm();

  // Pre-fill data
  if (user) {
    setValue("name", user.name);
    setValue("skills", user.skills?.join(", "));
    setValue("seniority", user.seniority);
  }

  const onSubmit = async (data: any) => {
    const updatedData = {
      ...data,
      skills: data.skills.split(",").map((s: string) => s.trim()),
    };
    await API.put(`/engineers/${user.id}`, updatedData);
    alert("Profile updated successfully!");
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">My Profile</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <input {...register("name")} placeholder="Name" className="border w-full p-2" />
        <input {...register("skills")} placeholder="Skills (comma separated)" className="border w-full p-2" />
        <select {...register("seniority")} className="border w-full p-2">
          <option value="junior">Junior</option>
          <option value="mid">Mid</option>
          <option value="senior">Senior</option>
        </select>
        <button className="bg-blue-500 text-white py-2 px-4 rounded">Update Profile</button>
      </form>
    </div>
  );
}
