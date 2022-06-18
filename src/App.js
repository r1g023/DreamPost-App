import React, { createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Stack } from "@mui/material";

import CreatePost from "./components/CreatePost";

import Login from "./components/Login";
import Signup from "./components/Signup";
import Books from "./components/Books";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";
import MainPage from "./pages/MainPage";

export const UserContext = createContext();

function App() {
  const navigate = useNavigate();
  const [user, setUser] = React.useState("");

  // useEffect(() => {
  //   const data = localStorage.getItem("user");
  //   if (data) {
  //     setUser(JSON.parse(data));
  //   }
  // }, []);

  //save note card to local storage
  useEffect(() => {
    // localStorage.setItem("user", JSON.stringify(user));
    document.title = user ? `Welcome ${user}` : "please login";
  }, [user]);

  if (!user) {
    return <Login setUser={setUser} />;
  }
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Box>
        {/* <CreatePost /> */}
        <Routes>
          <Route path="/" element={!user ? navigate("/login") : <MainPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route
            path="/books"
            element={
              <PrivateRoute>
                <Books />
              </PrivateRoute>
            }
          />
        </Routes>
      </Box>
    </UserContext.Provider>
  );
}

export default App;
