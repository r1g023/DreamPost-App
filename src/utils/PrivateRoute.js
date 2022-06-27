import React from "react";
import { Navigate, Outlet } from "react-router-dom";

import { UserContext } from "../App";

function PrivateRoute({ children }) {
  const { user } = React.useContext(UserContext);
  const token = window.localStorage.getItem("auth-token");
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children ? children : <Outlet />;
}

export default PrivateRoute;
