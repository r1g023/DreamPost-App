import React, { useState } from "react";
import {
  Box,
  CircularProgress,
  LinearProgress,
  Stack,
  styled,
} from "@mui/material";
import Post from "./Post";
import NavBarSearch from "../pages/NavBarSearch";
import { useQuery, useMutation, gql } from "@apollo/client";
import Modal from "./Modal";
import RotateRightSharpIcon from "@mui/icons-material/RotateRightSharp";

import jwt_decode from "jwt-decode";
import { toast, ToastContainer } from "react-toastify";
import { UserContext } from "../App";

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

//

const DELETE_POST = gql`
  mutation deletePost($id: Int!) {
    deletePost(id: $id) {
      id
      title
    }
  }
`;

const Feed = ({
  mode,
  userList,
  searchValue,
  setSearchValue,
  clearResults,
  errorMessage,
  setErrorMessage,
  data,
  postData,
  setPostData,
  loading,
  postError,
}) => {
  const [deletePost, { error }] = useMutation(DELETE_POST);
  const { user, setUser } = React.useContext(UserContext);

  React.useEffect(() => {}, [data, postData, setPostData, deletePost]);

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }

  // handle delete post
  const handlePostDelete = async (post) => {
    const token = window.localStorage.getItem("auth-token");
    if (!token || (token && jwt_decode(token).exp * 1000 < Date.now())) {
      toast.error("Your session has expired. Please login again.", {
        autoClose: 5000,
        onClose: () => {
          setUser("");
        },
      });
    } else {
      let deletedPost = await deletePost({
        variables: { id: post.id },

        update: (cache) => {
          const prevData = cache.readQuery({ query: GET_POSTS });
          // console.log("prevData--->", prevData);
          const newData = prevData.getPosts.filter(
            (item) => item.id !== post.id
          );

          cache.writeQuery({
            query: GET_POSTS,
            // also grab the post id
            data: { getPosts: newData },
          });
        },
      });

      // console.log("deletedPost--->", deletedPost);
      // console.log("deletedPost", deletedPost);
      return deletedPost;
    }
  };

  // handle submit
  const handleSubmit = (e) => {
    const token = window.localStorage.getItem("auth-token");

    if (!token || (token && jwt_decode(token).exp * 1000 < Date.now())) {
      toast.error("Your session has expired. Please login again.", {
        autoClose: 5000,

        onClose: () => {
          setUser("");
        },
      });
    } else {
      let result = data.getPosts.filter((item) => {
        // console.log("item", item);

        if (item.title.match(new RegExp(searchValue, "i"))) return item;
        if (item.post.match(new RegExp(searchValue, "i"))) return item;
        if (item.user.match(new RegExp(searchValue, "i"))) return item;
      });

      result.length === 0
        ? setErrorMessage("No results found for " + searchValue)
        : setErrorMessage("");

      setPostData(result);
      scrollToTop();
    }
  };

  if (loading)
    return (
      <Stack
        sx={{
          width: "100%",
          color: "grey.500",
        }}
        spacing={2}>
        <LinearProgress
          color="otherColor"
          sx={{ position: "absolute", left: 0, right: 0, height: "7px" }}
        />
        <CircularProgress
          color="otherColor"
          sx={{
            position: "absolute",
            left: "44%",
            top: "50%",
          }}
          size={60}
        />
      </Stack>
    );

  // adding this in case of an error the reload the page
  if (error) {
    let confirmRefresh = window.confirm("Error: something went wrong.");
    if (confirmRefresh) {
      window.location.reload();
    }
  }

  return (
    <div className="searchResults" style={{ zIndex: 2 }}>
      <NavBarSearch
        setSearchValue={(e) => setSearchValue(e.target.value)}
        searchValue={searchValue}
        handleSubmit={handleSubmit}
        clearResults={clearResults}
        mode={mode}
        errorMessage={errorMessage}
      />

      {/* Refresh Icon */}
      <RotateRightSharpIcon
        className="searchIcon"
        id="refreshIcon"
        //add size
        fontSize="large"
        title="See Latest Posts"
        onClick={() => {
          if (searchValue) {
            setSearchValue("");
            setErrorMessage("");
            setPostData(data.getPosts);
          } else {
            scrollToTop();
            handleSubmit();
          }
        }}
      />

      {errorMessage && (
        <h2
          className="errorMessage"
          style={{
            color: mode ? "white" : "black",
            marginTop: searchValue || errorMessage ? "160px" : "0px",
          }}>
          <p style={{ color: "red" }}> {errorMessage}</p>
          <p>Clear results to see latest posts...</p>
        </h2>
      )}

      <div
        style={{
          marginTop: "20px",
          height: errorMessage || searchValue ? "100vh" : "",
        }}>
        <Box flex={6} p={3} sx={{ display: "block", marginTop: "110px" }}>
          {/* all posts */}
          {postData &&
            postData
              .map((item) => {
                // console.log("non search result data", item);
                return (
                  <Post
                    post={item}
                    key={item.id}
                    handlePostDelete={(myTest) => {
                      let confirmDelete = window.confirm(
                        "Are you sure you want to delete your Post?"
                      );
                      if (confirmDelete) {
                        handlePostDelete(item);

                        window.location.reload(false);
                      }
                    }}
                    mode={mode}
                    postData={postData}
                    userList={userList}
                  />
                );
              })
              .reverse()}

          {/* search results after searching for posts */}
          {!postData &&
            data &&
            data.getPosts
              .map((item) => {
                // console.log("search result data", item);
                return (
                  <Post
                    post={item}
                    key={item.id}
                    handlePostDelete={() => {
                      // confirm before deleting
                      let confirmDelete = window.confirm(
                        "Are you sure you want to delete this post?"
                      );
                      if (confirmDelete) {
                        handlePostDelete(item);
                      }
                    }}
                    mode={mode}
                    postData={postData}
                    userList={userList}
                  />
                );
              })
              .reverse()}
        </Box>
      </div>
    </div>
  );
};

export default Feed;
