import React from "react";
import { Navigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

function PrivateRoute({ children }) {
  // keep track of token on local storage with useEffect

  const token = window.localStorage.getItem("auth-token");
  // console.log("token", token);

  // use jwt-decode to decode token in useEffect
  // console.log("token", token);
  // let decodedToken = jwt_decode(token);
  // console.log("decodedToken", decodedToken);

  // if (decodedToken.exp * 1000 < Date.now()) {
  //   return <Navigate to="/login" />;
  // }

  if (!token) {
    localStorage.removeItem("editName");
    localStorage.removeItem("user");
    localStorage.removeItem("auth-token");
    window.localStorage.clear();
    return <Navigate to="/login" />;
  }

  return children;
}

export default PrivateRoute;
