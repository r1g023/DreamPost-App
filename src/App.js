import React, { createContext, useEffect } from "react";
import { Box, Stack } from "@mui/material";

import CreatePost from "./components/CreatePost";
import Feed from "./components/Feed";
import Navbar from "./components/Navbar";
import Rightbar from "./components/Rightbar";
import Sidebar from "./components/Sidebar";
import Login from "./components/Login";
import Signup from "./components/Signup";

export const UserContext = createContext();

function App() {
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

  if (!user) return <Login setUser={setUser} />;
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Box>
        <Navbar />
        <Signup />

        <Stack direction="row" spacing={2} justifyContent="space-around">
          <Sidebar />
          <Feed />
          <Rightbar />
        </Stack>
        <CreatePost />
      </Box>
    </UserContext.Provider>
  );
}

export default App;
