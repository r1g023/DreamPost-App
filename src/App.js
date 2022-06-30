import React, { createContext, useEffect } from "react";
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
export const UserContext = createContext();

function App() {
  const [user, setUser] = React.useState("");
  const [userId, setUserId] = React.useState();

  console.log("user on app---->", user);
  console.log("userId on app---->", userId);

  useEffect(() => {
    const data = localStorage.getItem("user");
    const myUserId = localStorage.getItem("userId");
    if (data) setUser(JSON.parse(data));
    if (myUserId) setUserId(JSON.parse(myUserId));
    document.title = user ? `Welcome  ${user} ` : "please login";
  }, [user, userId]);

  return (
    <UserContext.Provider value={{ user, setUser, userId }}>
      <Box>
        <Navbar user={user} setUser={setUser} />
        <Routes>
          <Route
            path={"/login"}
            element={<Login setUser={setUser} setUserId={setUserId} />}
          />
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
        </Routes>
        {/* add MainPage to private route */}
      </Box>
    </UserContext.Provider>
  );
}

export default App;
