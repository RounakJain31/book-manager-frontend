import React, { useState } from "react";
import { loginUser } from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/authcontext";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { setUser } = useAuth();

  const navigate = useNavigate();

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const validateForm = () => {
    if (!form.email.trim()) {
      setError("Email is required");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(form.email)) {
      setError("Invalid email format");
      return false;
    }
    if (!form.password) {
      setError("Password is required");
      return false;
    }
    return true;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const res = await loginUser(form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/dashboard");
      setUser(res.data.user);
      
    } catch (err) {
      setError(err?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className="min-h-screen flex items-center justify-end p-6 bg-contain md:bg-cover bg-center bg-no-repeat bg-gradient-to-br from-purple-50 to-violet-200 p-4"
        style={{ backgroundImage: "url('/bg.jpg')" }}
      >
      <div className="max-w-md w-full bg-gradient-to-br from-purple to-violet-50 p-8 rounded-xl shadow-xl border border-blue-300">
        <h2 className="text-2xl font-semibold mb-6 text-center text-black-900">
          Login
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-black-800">Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={onChange}
              className="w-full border border-black-300 bg-black-50 p-3 rounded-lg mt-1 focus:ring-2 focus:ring-black-500 focus:border-black-500 outline-none transition"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-black-800">Password</label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={onChange}
              className="w-full border border-black-300 bg-black-50 p-3 rounded-lg mt-1 focus:ring-2 focus:ring-black-500 focus:border-black-500 outline-none transition"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-orange-600 to-indigo-600 text-black py-3 rounded-lg font-medium hover:from-orange-700 hover:to-indigo-700 disabled:opacity-50 transition duration-300 shadow-md hover:shadow-lg"
          >
            {loading ? "Logging in..." : "Login"}
            {loading && (
              <span className="ml-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
            )}

          </button>
        </form>

        <p className="text-center mt-4 text-sm text-black-700">
          Don't have an account?{" "}
          <Link className="text-purple-600 font-medium hover:text-purple-700" to="/signup">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
}