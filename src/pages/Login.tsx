import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

interface loginForm {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [formData, setFormData] = useState<loginForm>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const {login} = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    console.log("Submit clicked")
    console.log(formData)

    if (!formData.email || !formData.password) {
      setError("All fields are required");
    }

    try {
      const res = await fetch("http://localhost:3002/auth/signin", {
        method: "POST",
        credentials: 'include',  // ✅ Must be here to accept Set-Cookie header
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login Failed");
      }

      login(data.token)
      navigate("/home");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-sm space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-blue-700">
          Welcome Back
        </h2>

        {error && <p className="text-red-600 text-sm text-center">{error}</p>}

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-600"
          >
            Email Address
          </label>
          <input
            name="email"
            type="email"
            placeholder="Enter your email"
            onChange={handleChange}
            value={formData.email}
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-600"
          >
            Password
          </label>
          <input
            name="password"
            type="password"
            placeholder="Enter your password"
            onChange={handleChange}
            value={formData.password}
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition duration-300"
        >
          Sign In
        </button>

        <p className="text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-600 hover:underline">
            Sign up
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;
