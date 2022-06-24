import React from "react";
import { Box } from "@mui/material";
import Post from "./Post";

const Feed = ({ posts }) => {
  return (
    <Box flex={6} p={3}>
      {posts.map((item) => (
        <Post data={item} key={item.id} />
      ))}
    </Box>
  );
};

export default Feed;
