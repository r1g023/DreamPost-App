import React, { createContext } from "react";
import { Box, Stack } from "@mui/material";

import CreatePost from "./components/CreatePost";
import Feed from "./components/Feed";
import Navbar from "./components/Navbar";
import Rightbar from "./components/Rightbar";
import Sidebar from "./components/Sidebar";
import Login from "../src/components/Login";

export const UserContext = createContext();

function App() {
  const [user, setUser] = React.useState("");

  React.useEffect(() => {
    document.title = user ? `Welcome ${user}` : "please login";
  }, [user]);

  if (!user) return <Login setUser={setUser} />;
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Box>
        <Navbar />
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
