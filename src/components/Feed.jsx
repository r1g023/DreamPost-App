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

const Feed = ({ mode }) => {
  const [searchValue, setSearchValue] = React.useState("");
  const { loading, error, data } = useQuery(GET_POSTS);

  const [deletePost] = useMutation(DELETE_POST);
  const [postData, setPostData] = useState(data);
  const [errorMessage, setErrorMessage] = useState("");
  const [toggleModal, setToggleModal] = useState(false);

  //useEffect
  React.useEffect(() => {
    // console.log("Post data on Feed USE EFFECT---************->", postData);
    // console.log("data on Feed USE EFFECT________________________->", data);
  }, [data, postData]);

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
      return deletedPost;
    }
  };

  // handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    // add data to search.posts array
    let result = data.getPosts.filter((item) => {
      // console.log("item search", item);

      if (item.title.match(new RegExp(searchValue, "i"))) return item;
      if (item.post.match(new RegExp(searchValue, "i"))) return item;
    });
    // console.log("result", result);
    // save no result to errors
    result.length === 0
      ? setErrorMessage("No results found for " + searchValue)
      : setErrorMessage("");

    setPostData(result);
  };

  // clear results
  function clearResults() {
    setSearchValue("");
    let results = data.getPosts.map((item) => item);
    setPostData(results);
    setErrorMessage("");
  }

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

  if (error) return <p>Error: {error.message}</p>;

  return (
    <Box flex={6} p={3}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <NavBarSearch
          sx={{ margin: "0 auto" }}
          setSearchValue={(e) => setSearchValue(e.target.value)}
          searchValue={searchValue}
          handleSubmit={handleSubmit}
          clearResults={clearResults}
        />
      </div>

      <h2 style={{ color: "red", marginLeft: "105px" }}>{errorMessage}</h2>
      <div style={{ height: "100vh" }}>
        {postData &&
          postData
            .map((item) => {
              return (
                <Post
                  post={item}
                  key={item.id}
                  handlePostDelete={() => handlePostDelete(item)}
                />
              );
            })
            .reverse()}
      </div>
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
              />
            );
          })
          .reverse()}
    </Box>
  );
};

export default Feed;
