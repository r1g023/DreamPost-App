import React from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { UserContext } from "../App";

function PrivateRoute({ children }) {
  const { user } = React.useContext(UserContext);
  const navigate = useNavigate();

  React.useEffect(() => {
    const data = localStorage.getItem("user");
    JSON.parse(data);

    if (data.role !== "admin") {
      navigate("*");
    }
  }, [user, navigate]);

  const token = window.localStorage.getItem("auth-token");
  if (!token || user.role !== "admin") {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default PrivateRoute;
