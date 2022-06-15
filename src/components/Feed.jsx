import React from "react";
import { Box } from "@mui/material";
import Post from "./Post";
import { postList } from "../postList";

const Feed = () => {
  return (
    <Box flex={6} p={3}>
      {postList.map((item) => (
        <>
          <Post data={item} key={item.id} />
        </>
      ))}
    </Box>
  );
};

export default Feed;
