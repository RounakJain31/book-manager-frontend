import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/authcontext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogoutbtn = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-gradient-to-r from-orange-600 to-indigo-600 text-black p-4 flex justify-between items-center shadow-lg">
      <h1 
        className="text-xl font-bold cursor-pointer hover:text-amber-200 transition duration-200" 
        onClick={() => navigate("/")}
      >
        📚 Personal Books Manager 📚
      </h1>

      <div className="flex items-center gap-4">

        {user ? (
          <>
            <span className="font-medium bg-gradient-to-r from-amber-500 to-purple-500 px-4 py-1 rounded-full text-sm shadow">
              {user.name}
            </span>

            <button
              onClick={handleLogoutbtn}
              className="bg-grey-to-r from-grey-500 to-grey-500 text-nlack px-4 py-2 rounded-lg font-medium hover:from-red-600 hover:to-pink-600 transition duration-300 shadow-md hover:shadow-lg"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/"
              className="bg-grey-to-r from-grey-500 to-grey-500 text-black px-4 py-2 rounded-lg font-medium hover:from-amber-600 hover:to-orange-600 transition duration-300 shadow-md hover:shadow-lg"
            >
              Login
            </Link>

            <Link
              to="/signup"
              className="bg-grey-to-r from-grey-500 to-grey-500 text-black px-4 py-2 rounded-lg font-medium hover:from-emerald-600 hover:to-teal-600 transition duration-300 shadow-md hover:shadow-lg"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}