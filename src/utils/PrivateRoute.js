import React from "react";
import { useNavigate } from "react-router-dom";
// import user context from App.js
import { UserContext } from "../App";

function PrivateRoute({ children }) {
  // get user from user context
  const { user } = React.useContext(UserContext);
  console.log("user on PrivateRoute----->", user);
  const navigate = useNavigate();
  const token = window.localStorage.getItem("auth-token");
  if (token) {
    return children;
  }

  // if no use or no token then navigate back to login pages
  if (!user) {
    navigate("/login");
  }
}

export default PrivateRoute;
