import { Stack } from "@mui/material";
import React, { createContext } from "react";
import CreatePost from "../components/CreatePost";
import Feed from "../components/Feed";
import Rightbar from "../components/Rightbar";
import Sidebar from "../components/Sidebar";
import { UserContext } from "../App";
import { useQuery, useMutation, gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";
export const ModeContext = createContext();

const GET_POSTS = gql`
  query getPosts {
    getPosts {
      id
      title
      date
      image
      post
      liked
      user
      user_id
      comments {
        id
        comment
        user
        post_id
      }
    }
  }
`;

export const GET_USERS = gql`
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

// will need to bring posts here as well

const MainPage = () => {
  const { user, setUser, mode, setMode } = React.useContext(UserContext);
  const [searchValue, setSearchValue] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");

  const getAllPosts = useQuery(GET_POSTS);

  console.log("datas---->", getAllPosts);

  const [postData, setPostData] = React.useState(getAllPosts.data);

  function clearResults() {
    setSearchValue("");
    let results = getAllPosts.data.getPosts.map((item) => item);
    setPostData(results);
    setErrorMessage("");
  }

  const navigate = useNavigate();
  // GET users from query
  const { data } = useQuery(GET_USERS);
  console.log("userListData on Post component---->", data);

  React.useEffect(() => {
    // setMode(!mode);

    setMode(user.dark_mode);
    if (user.role === "user") {
      navigate("*");
    }
  }, [
    user.dark_mode,
    navigate,
    user.role,
    setMode,
    mode,
    getAllPosts.data,
    postData,
  ]);

  return (
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
          marginTop: "65px",
        }}
      >
        <Sidebar mode={mode} user={user} setMode={setMode} setUser={setUser} />
        <Feed
          mode={mode}
          userList={data}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          clearResults={clearResults}
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
          data={getAllPosts.data}
          postData={postData}
          setPostData={setPostData}
          loading={getAllPosts.loading}
          error={getAllPosts.error}
        />
        <Rightbar mode={mode} />
      </Stack>
      <CreatePost mode={mode} clearResults={clearResults} />
    </>
  );
};

export default MainPage;
// searchValue,
// setSearchValue,
// clearResults,
// errorMessage,
// setErrorMessage,
// data,
// postData,
// setPostData,
// loading,
// error,
