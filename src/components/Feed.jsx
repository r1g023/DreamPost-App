import React from "react";
import {
  Box,
  CircularProgress,
  LinearProgress,
  Stack,
  styled,
} from "@mui/material";
import Post from "./Post";
import { useQuery, useMutation, gql } from "@apollo/client";

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

const Feed = () => {
  const [post, setPost] = React.useState({
    id: "",
    title: "",
    date: "",
    image: "",
    post: "",
    liked: false,
    user: "",
    user_id: "",
  });
  const [searchValue, setSearchValue] = React.useState("");
  const { loading, error, data } = useQuery(GET_POSTS);
  const [deletePost] = useMutation(DELETE_POST);

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
          console.log("post cache--->", cache);
          const prevData = cache.readQuery({ query: GET_POSTS });
          console.log("prevData--->", prevData);
          const newData = prevData.getPosts.filter(
            (item) => item.id !== post.id
          );
          console.log("newData--->", newData);
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

  React.useEffect(() => {
    console.log("Post data on Feed USE EFFECT---->", data);
  }, [data]);

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

  // handle submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // add data to search.posts array
    let postData = data.getPosts.filter((item) => {
      console.log("item search", item);
      // if no search input or empty then return error and save to errors in state

      if (item.title.match(new RegExp(searchValue, "i"))) return item;
      // // get info from GET_POSTS query
      // if (item.date.includes(search.toLowerCase())) return item;
      // if (item.post.includes(search.toLowerCase())) return item;
      // if (item.user.includes(search.toLowerCase())) return item;
      // if (item.image.includes(search.toLowerCase())) return item;
      return item;
    });

    return postData;
  };

  if (error) return <p>Error: {error.message}</p>;

  return (
    <Box flex={6} p={3}>
      <input
        type="text"
        name="search"
        onChange={(e) => setSearch(e.target.value)}
      />
      <button onClick={handleSubmit}>Search posts</button>
      {data.getPosts
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
    </Box>
  );
};

export default Feed;
