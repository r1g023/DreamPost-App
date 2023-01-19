import React from "react";
import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";

// {
//   id: 2,
//   name: "John Doe",
//   avatar:
//     "https://cdn.pixabay.com/photo/2017/01/31/21/23/avatar-2027366_1280.png",
//   comment: "Wish I could come, but I'm out of town this…",

const RightBarConversations = ({ data, mode }) => {
  return (
    <List
      sx={{
        width: "100%",
        maxWidth: 360,
        borderBottom: mode ? "1px solid #e0e0e0" : "none",
      }}
    >
      <ListItem alignItems="flex-start" col={10} sx={{ overflow: "auto" }}>
        <ListItemAvatar>
          <Avatar alt={data.name} src={data.avatar} />
        </ListItemAvatar>
        <ListItemText
          // title subject
          primary={
            <React.Fragment>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary"
                fontWeight="fontWeightBold"
              >
                <span style={{ color: mode ? "white" : "", fontSize: "1.1em" }}>
                  {data.subject}
                </span>
              </Typography>
            </React.Fragment>
          }
          // secondary comment and username
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary"
                fontWeight="fontWeightBold"
              >
                <span
                  style={{
                    color: mode ? "white" : "",
                    fontSize: "1em",
                    textDecoration: "underline",
                  }}
                >
                  @{data.name}
                </span>
              </Typography>
              <span style={{ color: mode ? "white" : "", fontSize: "0.9em" }}>
                {data.comment}
              </span>
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </List>
  );
};

export default RightBarConversations;
