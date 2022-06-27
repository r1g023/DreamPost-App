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
  const [posts, setPosts] = React.useState(postList);
  const navigate = useNavigate();
  console.log("user---->", user);

  useEffect(() => {
    const data = localStorage.getItem("user");
    if (data) {
      setUser(JSON.parse(data));
    }
    // localStorage.setItem("user", JSON.stringify(user));
    document.title = user ? `Welcome ${user}` : "please login";
  }, [user]);

  // if (!user) {
  //   return <Login setUser={setUser} />;
  // }

  return (
    <UserContext.Provider value={{ user, setUser, posts, setPosts }}>
      <Box>
        <Navbar user={user} setUser={setUser} />
        <Routes>
          {/* <Route path="/" element={<MainPage posts={posts} />} /> */}

          <Route path={"/login"} element={<Login setUser={setUser} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<NoMatch />} />

          {/*home page */}

          <Route
            path="/"
            element={
              <PrivateRoute>
                <MainPage posts={posts} />
              </PrivateRoute>
            }
          />
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
