import { useNavigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const navigate = useNavigate();
  const token = window.localStorage.getItem("auth-token");
  if (token) {
    return children;
  }

  navigate("/login");
}

export default PrivateRoute;
