import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/auth.context";

// PrivateRoute allows access to specific pages ONLY if you are logged in.
// Example: Edit user page.
const PrivateRoute: React.FC = () => {
  const { isLoggedin, isLoading } = useAuth();

  if (isLoading) return <p>Loading...</p>;

  return isLoggedin ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;