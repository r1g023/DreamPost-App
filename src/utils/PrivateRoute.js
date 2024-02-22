import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "../App";

function PrivateRoute({ children }) {
  const token = window.localStorage.getItem("auth-token");
  const { user, setUser } = React.useContext(UserContext);

  if (!token) {
    window.localStorage.removeItem("likedComments");

    window.localStorage.removeItem("auth-token");
    window.localStorage.removeItem("user");
    window.localStorage.removeItem("editName");
    window.localStorage.removeItem("ab.storage");
    window.localStorage.removeItem("value");

    toast.error("Please login again", {
      autoClose: 5000,

      onClose: () => {
        setUser("");
      },
    });
    return <Navigate to="/login" />;
  }

  const decoded = jwt_decode(token);
  if (decoded.exp * 1000 < Date.now()) {
    window.localStorage.removeItem("likedComments");
    window.localStorage.removeItem("auth-token");
    window.localStorage.removeItem("user");
    window.localStorage.removeItem("editName");
    window.localStorage.removeItem("ab.storage");
    window.localStorage.removeItem("value");

    toast.error("Your session has expired. Please login again.", {
      autoClose: 5000,

      onClose: () => {
        setUser("");
      },
    });

    return <Navigate to="/login" />;
  }

  return <>{children}</>;
}

export default PrivateRoute;
