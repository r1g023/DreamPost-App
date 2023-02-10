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
  error,
}) => {
  const [deletePost] = useMutation(DELETE_POST);

  // const [errorMessage, setErrorMessage] = useState("");

  //useEffect
  React.useEffect(() => {
    // console.log("Post data on Feed USE EFFECT---************->", postData);
    // console.log("data on Feed USE EFFECT________________________->", data);
    // if new post, rerender posts

    if (postData) {
      setPostData(postData);
    }
  }, [data, postData, setPostData, deletePost]);

  // handle delete post
  const handlePostDelete = async (post) => {
    let confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (confirmDelete) {
      let deletedPost = await deletePost({
        variables: { id: post.id },
        //get from cache and update upon delete instead of refetching post query
        update: (cache) => {
          // console.log("post cache--->", cache);
          const prevData = cache.readQuery({ query: GET_POSTS });
          // console.log("prevData--->", prevData);
          const newData = prevData.getPosts.filter(
            (item) => item.id !== post.id
          );
          // console.log("newData--->", newData);
          // once all data has been cleared from cache and added to newData, write it back to the cache so that when post is deleted, it will query comments array and  and update the post array with the new data array
          cache.writeQuery({
            query: GET_POSTS,
            data: { getPosts: newData },
          });
        },
      });

      // console.log("deletedPost--->", deletedPost);

      // if post is deleted and there's a search value, display alert
      if (searchValue && deletedPost) {
        window.alert("Post deleted");
      }
    }
  };

  // handle submit
  const handleSubmit = (e) => {
    // e.preventDefault();
    // add data to search.posts array
    let result = data.getPosts.filter((item) => {
      // console.log("item search", item);

      if (item.title.match(new RegExp(searchValue, "i"))) return item;
      if (item.post.match(new RegExp(searchValue, "i"))) return item;
      if (item.user.match(new RegExp(searchValue, "i"))) return item;
    });
    // console.log("result", result);
    // save no result to errors
    result.length === 0
      ? setErrorMessage("No results found for " + searchValue)
      : setErrorMessage("");

    setPostData(result);
  };

  // // clear results
  // function clearResults() {
  //   setSearchValue("");
  //   let results = data.getPosts.map((item) => item);
  //   setPostData(results);
  //   setErrorMessage("");
  // }

  if (loading)
    return (
      <Stack
        sx={{
          width: "100%",
          color: "grey.500",
        }}
        spacing={2}
      >
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

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  if (error) return <p>Error: {error.message}</p>;

  // if new post, automatically click on submit to rerender posts

  return (
    <div style={{ zIndex: 2 }}>
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
        id="myTest"
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
          style={{
            color: mode ? "white" : "black",
            marginTop: searchValue || errorMessage ? "160px" : "0px",
          }}
        >
          <p style={{ color: "red" }}> {errorMessage}</p>
          <p>Clear results to see latest posts...</p>
        </h2>
      )}

      <div
        style={{
          marginTop: "20px",
        }}
      >
        <Box flex={6} p={3} sx={{ display: "block", marginTop: "110px" }}>
          {/* all posts */}
          {postData &&
            postData
              .map((item) => {
                return (
                  <Post
                    post={item}
                    key={item.id}
                    handlePostDelete={() => handlePostDelete(item)}
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
                return (
                  <Post
                    post={item}
                    key={item.id}
                    handlePostDelete={() => handlePostDelete(item)}
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
