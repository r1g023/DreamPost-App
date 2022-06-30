import React from "react";
import { Box } from "@mui/material";
import Post from "./Post";
import { useQuery, gql } from "@apollo/client";

const GET_POSTS = gql`
  query getPosts {
    getPosts {
      id
      title
      date
      image
      content
      method
      liked
      user_id
      # comments {
      #   id
      #   comment
      #   post_id
      # }
    }
  }
`;

const Feed = () => {
  const { loading, error, data } = useQuery(GET_POSTS);

  React.useEffect(() => {
    console.log("Post data on Feed USE EFFECT---->", data);
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Box flex={6} p={3}>
      {data.getPosts.map((item) => {
        return <Post data={item} key={item.id} />;
      })}
    </Box>
  );
};

export default Feed;
