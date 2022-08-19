import React, { createContext, useEffect } from "react";
//import css from index.css
import "./index.css";
import { Box } from "@mui/material";

import Login from "./components/Login";
import Signup from "./components/Signup";
import Books from "./components/Books";
import { Route, Routes, useNavigate } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";
import MainPage from "./pages/MainPage";
import { postList } from "./postList";
import Navbar from "./components/Navbar";
import NoMatch from "./pages/NoMatch";
import Profile from "./components/Profile";
export const UserContext = createContext();

function App() {
  const [user, setUser] = React.useState("");
  const navigate = useNavigate();

  console.log("user on app---->", user);

  useEffect(() => {
    const data = localStorage.getItem("user");
    if (data) setUser(JSON.parse(data));

    document.title = user.username
      ? `Welcome  ${user.username} `
      : "please login";
  }, [user.username]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {/* console log req.decodedToken from backend API */}
      <Box>
        <Navbar setUser={setUser} />
        <Routes>
          <Route path={"/login"} element={<Login setUser={setUser} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<NoMatch />} />

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
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Box>
    </UserContext.Provider>
  );
}

export default App;
