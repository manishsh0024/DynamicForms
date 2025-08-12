import React, { useState } from "react";
import axios from "../axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      toast.success("Login Successful");
      navigate("/admin");
    } catch (err) {
      console.error("Login failed", err);
      toast.error("Invalid credentials!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-700 via-indigo-700 to-blue-700 px-4 sm:px-6 md:px-12">
      <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full flex flex-col md:flex-row overflow-hidden">
        {/* Left side - Branding */}
        <div className="w-full md:w-1/2 bg-gradient-to-tr from-indigo-600 to-purple-600 text-white flex flex-col justify-center items-center p-10 md:p-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 text-center md:text-left">
            Welcome Back!
          </h1>
          <p className="text-base sm:text-lg md:text-xl font-light max-w-xs text-center md:text-left">
            Manage your forms efficiently with our powerful admin dashboard.
          </p>
        </div>

        {/* Right side - Form */}
        <form
          onSubmit={handleLogin}
          className="w-full md:w-1/2 p-8 sm:p-10 md:p-12 flex flex-col justify-center space-y-8"
        >
          <h2 className="text-2xl sm:text-3xl md:text-3xl font-bold text-gray-900 mb-6 text-center">
            Admin Login
          </h2>

          <div>
            <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-indigo-400 focus:border-indigo-500 transition"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-indigo-400 focus:border-indigo-500 transition"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 shadow-md transition"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
