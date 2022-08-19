import { Stack } from "@mui/material";
import React from "react";
import CreatePost from "../components/CreatePost";
import Feed from "../components/Feed";
import Rightbar from "../components/Rightbar";
import Sidebar from "../components/Sidebar";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const { user, setUser } = React.useContext(UserContext);
  const [mode, setMode] = React.useState(user.dark_mode);
  const navigate = useNavigate();

  React.useEffect(() => {
    // setMode(!mode);
    // console.log("user USEEFFECT on main page---->", user);
    setMode(user.dark_mode);
  }, [user, user.dark_mode]);

  console.log("user on main page---->", user);
  // if (user.role === "user") navigate("/");
  return (
    <>
      {console.log("user DID RENDER on main page---->", user)}
      {user.role === "admin" ? (
        <>
          <Stack
            direction="row"
            spacing={0}
            justifyContent="space-around"
            height="100vh"
            sx={{
              background: mode ? "#1B2430" : "",
              height: "100%",
              opacity: "0.9",
              color: mode ? "white" : "black",
            }}
          >
            <Sidebar
              mode={mode}
              user={user}
              setMode={setMode}
              setUser={setUser}
            />
            <Feed mode={mode} />
            <Rightbar mode={mode} />
          </Stack>
          <CreatePost mode={mode} />{" "}
        </>
      ) : (
        navigate("*")
      )}
    </>
  );
};

export default MainPage;
