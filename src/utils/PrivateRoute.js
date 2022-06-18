import { useNavigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const token = window.localStorage.getItem("auth-token");
  if (token) {
    return children;
  }
  if (!token) {
    <p>Error cant</p>;
  }
  navigate("/login");
};

export default PrivateRoute;
