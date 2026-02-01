import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authcontext";

export default function Route({ children }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
}