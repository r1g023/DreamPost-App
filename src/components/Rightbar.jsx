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
import { friends,  } from "../online-users";
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

  // console.log("data---- in RIGHTBAR>", data);

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

        scrollY: "scroll",
        overflowX: "hidden",
      }}>
      {/* container for the rightbar */}
      <Box
        position="fixed"
        p={2}
        sx={{
          overflowY: "scroll",
          overflowX: "hidden",
          maxHeight: "100vh",
        }}>
        <Typography variant="h4">Online Friends</Typography>
        {/* container for the online friends */}
        <AvatarGroup total={10}>
          {friends.map((item) => (
            <Avatar
              key={item.id}
              alt={item.name}
              src={item.avatar}
              border={10}
            />
          ))}
        </AvatarGroup>

        {/* latest posts */}
        <Typography variant="h5" fontWeight={400} mt={2} mb={2}>
          Latest Photos
        </Typography>

        {/* </ImageList> */}

        {/* container for the latest posts */}
        <ImageList
          cols={3}
          rowHeight={100}
          gap={10}
          sx={{
            overflowY: "scroll",
            overflowX: "hidden",
            maxHeight: "500px",
          }}>
          {loading ? (
            <>
              <Stack
                sx={{
                  width: "100%",
                  color: "grey.500",
                }}
                spacing={2}>
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
                data.getPosts
                  .map((item) => (
                    <ImageListItem
                      key={item.id}
                      sx={{
                        cursor: "pointer",

                        textAlign: "center",
                        margin: "0 auto",

                        "&:hover": {
                          opacity: "0.9",

                          // add faded border
                          boxShadow: mode
                            ? "0 0 20px #888888"
                            : "0 0 20px #000",
                          borderRadius: "10px",
                        },
                      }}>
                      <img
                        src={item.image}
                        srcSet={item.image}
                        alt={item.title}
                        loading="lazy"
                        style={{
                          width: "100px",
                          height: "100px",
                        }}
                      />
                    </ImageListItem>
                  ))
                  .reverse()}
            </>
          )}
         
        </ImageList>
        {/* container for the latest comment conversations */}
        <Typography variant="h5" fontWeight={400} mt={4} mb={2}>
          Latest Conversations
        </Typography>

        {/* latest conversations by each user */}
        <Box
          sx={{
            scrollY: "scroll",
            overflowX: "hidden",
            maxHeight: "600px",
            marginBottom: "100px",
          }}>
          {data &&
            data.getPosts
              .map((item, index) => {
                return <RightBarPosts key={item.id} data={item} mode={mode} />;
              })
              .reverse()}

          {friends.map((item, index) => {
            return (
              <RightBarConversations key={item.id} data={item} mode={mode} />
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default Rightbar;
