import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";

// {
//   id: 2,
//   name: "John Doe",
//   avatar:
//     "https://cdn.pixabay.com/photo/2017/01/31/21/23/avatar-2027366_1280.png",
//   comment: "Wish I could come, but I'm out of town this…",

const RightBarConversations = ({ data }) => {
  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt={data.name} src={data.avatar} />
        </ListItemAvatar>
        <ListItemText
          primary={data.subject}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {data.name}
              </Typography>
              {data.comment}
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </List>
  );
};

export default RightBarConversations;
