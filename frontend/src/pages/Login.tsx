import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export default function Login() {
  const { register, handleSubmit } = useForm();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data: any) => {
    await login(data.email, data.password);
    navigate("/team-overview");
  };

  return (
    <div className="flex h-screen justify-center items-center bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-md p-6 rounded space-y-3 w-80"
      >
        <h2 className="text-xl font-bold text-center">Login</h2>

        {/* Email */}
        <input
          {...register("email")}
          placeholder="Email"
          className="border w-full p-2 rounded"
        />

        {/* Password with eye toggle */}
        <div className="relative">
          <input
            {...register("password")}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="border w-full p-2 rounded pr-10"
          />
          <span
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-600"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <AiOutlineEyeInvisible size={20} />
            ) : (
              <AiOutlineEye size={20} />
            )}
          </span>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="bg-blue-500 text-white w-full py-2 rounded cursor-pointer"
        >
          Login
        </button>
      </form>
    </div>
  );
}

