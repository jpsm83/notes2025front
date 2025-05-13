import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/auth.context";

// AnounRoute allows access to specific pages ONLY if you are not logged in.
// Example: A login page. You can't access it if you are already logged in.
const AnounRoute: React.FC = () => {
  const { isLoggedin } = useAuth();

  return isLoggedin ? <Navigate to="/" replace /> : <Outlet />;
};

export default AnounRoute;
