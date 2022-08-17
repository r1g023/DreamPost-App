import React from "react";
import {
  Avatar,
  AvatarGroup,
  Box,
  CircularProgress,
  ImageList,
  ImageListItem,
  Stack,
  Typography,
} from "@mui/material";
import { friends, itemData } from "../online-users";
import RightBarConversations from "./RightBarConversations";
import RightBarPosts from "./RightBarPosts";
import { useQuery, gql } from "@apollo/client";

const GET_POSTS = gql`
  query getPosts {
    getPosts {
      id
      user
      title
      post
      image
    }
  }
`;

const Rightbar = ({ mode }) => {
  const { loading, error, data } = useQuery(GET_POSTS);
  React.useEffect(() => {
    // console.log("useEffect post data image Righbar-->", data);
  }, [data]);

  console.log("data---->", data);

  if (error) return <p>Error: {error.message}</p>;
  return (
    <Box
      flex={3}
      p={2}
      sx={{
        display: {
          xs: "none",
          sm: "none",
          md: "block",
        },
      }}
    >
      {/* container for the rightbar */}
      <Box position="fixed" p={2}>
        <Typography variant="h4">Online Friends</Typography>
        {/* container for the online friends */}
        <AvatarGroup total={10}>
          {friends.map((item) => (
            <Avatar key={item.id} alt={item.name} src={item.avatar} />
          ))}
        </AvatarGroup>

        {/* latest posts */}
        <Typography variant="h5" fontWeight={400} mt={2} mb={2}>
          Latest Photos
        </Typography>

        {/* </ImageList> */}

        {/* container for the latest posts */}
        <ImageList cols={3} rowHeight={100} gap={10}>
          {loading ? (
            <>
              <Stack
                sx={{
                  width: "100%",
                  color: "grey.500",
                }}
                spacing={2}
              >
                <CircularProgress
                  color="otherColor"
                  sx={{
                    position: "absolute",
                    left: "50%",
                    top: "30%",
                  }}
                  size={60}
                />
              </Stack>
            </>
          ) : (
            <>
              {data &&
                data.getPosts.map((item) => (
                  <ImageListItem key={item.id}>
                    <img
                      src={item.image}
                      srcSet={item.image}
                      alt={item.title}
                      loading="lazy"
                      style={{
                        width: "100px",
                        height: "100px",
                        cursor: "pointer",
                        border: "1px solid white",
                      }}
                    />
                  </ImageListItem>
                ))}
            </>
          )}
          {/*Mock data for the latest posts */}
          {/* {itemData.map((item) => (
            <ImageListItem key={item.img}>
              <img
                src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                alt={item.title}
                loading="lazy"
              />
            </ImageListItem>
          ))} */}
        </ImageList>
        {/* container for the latest comment conversations */}
        <Typography variant="h5" fontWeight={400} mt={4} mb={2}>
          Latest Conversations
        </Typography>

        {/* latest conversations by each user */}
        <Box sx={{ overflowY: "scroll", height: "700px" }}>
          {friends.map((item, index) => {
            return (
              <RightBarConversations key={item.id} data={item} mode={mode} />
            );
          })}

          {data &&
            data.getPosts
              .map((item, index) => {
                return <RightBarPosts key={item.id} data={item} mode={mode} />;
              })
              .reverse()}
        </Box>
      </Box>
    </Box>
  );
};

export default Rightbar;
