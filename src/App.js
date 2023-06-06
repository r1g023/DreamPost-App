import React, { createContext, useEffect } from "react";
//import css from index.css
import "./index.css";
import { Box } from "@mui/material";
import "./App.css";

import Login from "./components/Login";
import Signup from "./components/Signup";
import Books from "./components/Books";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";
import MainPage from "./pages/MainPage";
import { postList } from "./postList";
import Navbar from "./components/Navbar";
import NoMatch from "./pages/NoMatch";
import Profile from "./components/Profile";
export const UserContext = createContext();

function App() {
  const [user, setUser] = React.useState("");
  const [mode, setMode] = React.useState(user.dark_mode);
  let navigate = useNavigate();

  // console.log("user on app---->", user);

  useEffect(() => {
    const data = localStorage.getItem("user");
    if (data) setUser(JSON.parse(data));

    setMode(user.dark_mode);

    document.title = user.username
      ? `Welcome  ${user.username} `
      : "please login";
  }, [user.username, user.dark_mode, user.role, navigate]);

  return (
    <UserContext.Provider value={{ user, setUser, mode, setMode }}>
      {/* console log req.decodedToken from backend API */}
      {/* add styling to Box for small screens */}
      <Box sx={{ overflow: "hidden", background: mode ? "#2C394B" : "" }}>
        <Navbar setUser={setUser} mode={mode} />

        <Routes>
          <Route path={"/login"} element={<Login setUser={setUser} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<NoMatch mode={mode} />} />

          {/*home page */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <MainPage />
              </PrivateRoute>
            }
          />
          {/*books page */}
          <Route
            path="/books"
            element={
              <PrivateRoute>
                <Books />
              </PrivateRoute>
            }
          />

          {/*profile page */}
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
        </Routes>
      </Box>
    </UserContext.Provider>
  );
}

export default App;
