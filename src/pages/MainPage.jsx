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

const MainPage = () => {
  const { user, setUser, mode, setMode } = React.useContext(UserContext);
  const [searchValue, setSearchValue] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");

  const getAllPosts = useQuery(GET_POSTS);

  const [postData, setPostData] = React.useState(getAllPosts.data);

  function clearResults() {
    console.log("clearing results");
    setSearchValue("");
    let results = getAllPosts.data.getPosts.map((item) => item);
    setPostData(results);
    setErrorMessage("");
  }

  const navigate = useNavigate();

  const { data } = useQuery(GET_USERS);

  React.useEffect(() => {
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
        className="feed-responsiveOverflow"
        sx={{
          background: mode ? "#1B2430" : "",
          opacity: "0.9",
          color: mode ? "white" : "black",
          marginTop: errorMessage ? "65px" : "65px",
          height: searchValue || errorMessage ? "100vh" : "auto",
          overflow: "auto",
        }}>
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
          postError={getAllPosts.error}
        />
        <Rightbar mode={mode} />
      </Stack>
      <CreatePost
        mode={mode}
        searchValue={searchValue}
        setPostData={postData}
        postData={postData}
      />
    </>
  );
};

export default MainPage;
