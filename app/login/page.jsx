"use client";
import { useTanstack } from "@/providers/TanstackProvider";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation"; // Import useRouter

const LoginPage = () => {
  const { login } = useTanstack();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter(); // Initialize router

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      toast.success("Login successful!");
      router.push("/"); // Redirect to home page
    } catch (error) {
      toast.error("Login failed. Please check your credentials.");
    }
  };


  return (
    <div className="h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-4xl p-6 md:p-12 bg-white bg-opacity-10 rounded-2xl shadow-lg backdrop-blur-md border border-gray-700">
        <div className="flex justify-center mb-8">
          <span className="text-3xl font-bold text-yellow-400">
            Tailus Feedus
          </span>
        </div>

        <div className="flex flex-col md:flex-row gap-8 items-start justify-between">
          <div className="md:w-1/2">
            <h2 className="text-2xl md:text-4xl font-bold text-black">
              Welcome Back!
              <span className="block text-gray-700 font-medium">
                Login as a User
              </span>
            </h2>
            <p className="mt-4 text-black leading-relaxed">
              Access your account using your registered email and password.
            </p>
          </div>

          <div className="w-full md:w-1/2">
            <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-md">
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 rounded-lg border border-gray-300"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 rounded-lg border border-gray-300"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full p-3 bg-yellow-400 text-yellow-900 font-bold rounded-lg hover:bg-yellow-500"
                >
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
