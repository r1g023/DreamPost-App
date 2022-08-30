import React from "react";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const token = window.localStorage.getItem("auth-token");
  if (!token) {
    localStorage.removeItem("editName");
    localStorage.removeItem("user");
    localStorage.removeItem("auth-token");
    return <Navigate to="/login" />;
  }

  return children;
}

export default PrivateRoute;
