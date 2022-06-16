import React from "react";
import {
  Avatar,
  AvatarGroup,
  Box,
  ImageList,
  ImageListItem,
  Typography,
} from "@mui/material";
import { friends, itemData } from "../online-users";

const Rightbar = () => {
  return (
    <Box
      flex={3}
      p={2}
      sx={{ display: { xs: "none", sm: "block" }, border: "1px solid red" }}
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
        <Typography variant="h5" fontWeight={400}>
          Latest Posts
        </Typography>
        {/* container for the latest posts */}
        <ImageList cols={3} rowHeight={100} gap={5}>
          {itemData.map((item) => (
            <ImageListItem key={item.img}>
              <img
                src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                alt={item.title}
                loading="lazy"
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
    </Box>
  );
};

export default Rightbar;
