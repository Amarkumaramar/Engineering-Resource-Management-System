import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { register, handleSubmit } = useForm();
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    await login(data.email, data.password);
    navigate("/team-overview");
  };

  return (
    <div className="flex h-screen justify-center items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-md p-6 rounded space-y-3 w-80"
      >
        <h2 className="text-xl font-bold text-center">Login</h2>
        <input {...register("email")} placeholder="Email" className="border w-full p-2" />
        <input {...register("password")} type="password" placeholder="Password" className="border w-full p-2" />
        <button type="submit" className="bg-blue-500 text-white w-full py-2 rounded">Login</button>
      </form>
    </div>
  );
}
