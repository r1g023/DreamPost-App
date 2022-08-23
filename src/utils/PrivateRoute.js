import React from "react";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const token = window.localStorage.getItem("auth-token");
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default PrivateRoute;
