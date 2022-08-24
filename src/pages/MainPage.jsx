import { Stack } from "@mui/material";
import React from "react";
import CreatePost from "../components/CreatePost";
import Feed from "../components/Feed";
import Rightbar from "../components/Rightbar";
import Sidebar from "../components/Sidebar";
import { UserContext } from "../App";
import { useQuery, useMutation, gql } from "@apollo/client";

const GET_USERS = gql`
  query getUsers {
    getUsers {
      id
      first_name
      last_name
      dob
      email
      username
      role
      avatar
      dark_mode
      about_you
      created_at
      updated_at
      posts {
        id
        title
        date
        image
        comments {
          id
          comment
          user
          post_id
        }
      }
      comments {
        id
        comment
        liked
        count
        user
        post_id
      }
    }
  }
`;

const MainPage = () => {
  const { user, setUser } = React.useContext(UserContext);
  const [mode, setMode] = React.useState(user.dark_mode);
  // GET users from query
  const { data } = useQuery(GET_USERS);
  console.log("userListData on Post component---->", data);

  React.useEffect(() => {
    // setMode(!mode);

    setMode(user.dark_mode);
  }, [user.dark_mode]);

  return (
    <>
      {/* <Navbar /> */}
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
        <Sidebar mode={mode} user={user} setMode={setMode} setUser={setUser} />
        <Feed mode={mode} userList={data} />
        <Rightbar mode={mode} />
      </Stack>
      <CreatePost mode={mode} />
    </>
  );
};

export default MainPage;
