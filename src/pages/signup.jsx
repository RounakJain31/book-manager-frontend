import React, { useState } from "react";
import { registerUser } from "../services/api";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const validateForm = () => {
    if (!form.name.trim()) return setError("Name is required"), false;
    if (!form.email.trim()) return setError("Email is required"), false;
    if (!/\S+@\S+\.\S+/.test(form.email))
      return setError("Invalid email format"), false;
    if (!form.password) return setError("Password is required"), false;
    if (form.password.length < 6)
      return setError("Password must be at least 6 characters"), false;
    if (form.password !== form.confirmPassword)
      return setError("Passwords do not match"), false;

    return true;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      await registerUser({
        name: form.name,
        email: form.email,
        password: form.password,
      });

      alert("Signup successful! Please login.");
      navigate("/");
    } catch (err) {
      setError(err?.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className="min-h-screen flex items-center justify-end p-6 bg-contain md:bg-cover bg-center bg-no-repeat bg-gradient-to-br from-purple-50 to-violet-200 p-4"
        style={{ backgroundImage: "url('/bg.jpg')" }}
      >
      <div className="max-w-md w-full bg-gradient-to-br from-purple to-violet-50 p-8 rounded-xl shadow-xl border border-blue-300">

        <h2 className="text-2xl font-semibold text-center mb-6 text-black-900">
          Create an Account
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-4">
          
          <div>
            <label className="text-sm font-medium text-black-800">Name</label>
            <input
              name="name"
              type="text"
              value={form.name}
              onChange={onChange}
              className="w-full border border-black-300 bg-black-50 p-3 rounded-lg mt-1 focus:ring-2 focus:ring-black-500 focus:border-black-500 outline-none transition"
              placeholder="Enter your name"
            />
          </div>

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
              placeholder="At least 6 characters"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-black-800">Confirm Password</label>
            <input
              name="confirmPassword"
              type="password"
              value={form.confirmPassword}
              onChange={onChange}
              className="w-full border border-black-300 bg-black-50 p-3 rounded-lg mt-1 focus:ring-2 focus:ring-black-500 focus:border-black-500 outline-none transition"
              placeholder="Re-enter your password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-orange-600 to-indigo-600 text-black py-3 rounded-lg font-medium hover:from-orange-700 hover:to-indigo-700 disabled:opacity-50 transition duration-300 shadow-md hover:shadow-lg"
          >
            {loading ? "Creating Account..." : "Signup"}
            {loading && (
              <span className="ml-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
            )}

          </button>

        </form>

        <p className="text-center mt-4 text-sm text-black-700">
          Already have an account?{" "}
          <Link to="/" className="text-purple-600 font-medium hover:text-purple-700">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}