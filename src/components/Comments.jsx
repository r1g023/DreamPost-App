import React from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import {
  Avatar,
  Box,
  Button,
  CardHeader,
  Checkbox,
  Chip,
  Divider,
  Fab,
  Grid,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { UserContext } from "../App";

//container for like and edit/delete buttons
const StyledBox = styled(Box)({
  display: "flex",
  justifyContent: "space-around",
});

// container for edit and delete buttons
const StyledDeleteEditBox = styled(Box)({
  display: "flex",
  justifyContent: "flex-end",
});

const Comments = ({ commentData }) => {
  const { user } = React.useContext(UserContext);
  // const isCurrentUser = currentUser.user === user;
  // add comment to mutation

  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  return (
    <div style={{ border: "2px solid red" }}>
      {/* form for adding new comment */}

      <div style={{ padding: 14 }} className="App">
        <Paper style={{ padding: "10px 20px", border: "1px solid green" }}>
          <Grid container wrap="nowrap" spacing={2}>
            <Grid item>
              <Avatar alt="Remy Sharp" src={""} />
            </Grid>
            <Grid justifyContent="left" item xs zeroMinWidth>
              <h4 style={{ margin: 0, textAlign: "left" }}>
                User: {user.username}
              </h4>
              <p style={{ textAlign: "left" }}>{commentData.comment}</p>
              <p
                style={{ textAlign: "left", color: "gray", marginTop: "20px" }}
              >
                posted 1 minute ago..
              </p>
            </Grid>
          </Grid>
          <Divider variant="fullWidth" style={{ margin: "10px 0" }} />
          {/* container for the like and edit/delete buttons */}
          <StyledBox>
            <Box sx={{ border: "1px solid red", width: "30%" }}>
              <Checkbox
                {...label}
                icon={<FavoriteBorder />}
                checkedIcon={<Favorite />}
                color="greenLike"
              />
            </Box>
            {/* container for edit and delete buttons */}
            <StyledDeleteEditBox
              sx={{ border: "1px solid green", width: "70%" }}
            >
              {/* Edit comment button */}
              <Fab
                color="primary"
                aria-label="edit"
                size="small"
                sx={{ marginRight: "5px", marginTop: 1 }}
              >
                <EditIcon />
              </Fab>
              {/* Delete comment button */}
              <IconButton aria-label="delete" size="large" color="secondary">
                <DeleteIcon fontSize="inherit" />
              </IconButton>
            </StyledDeleteEditBox>
          </StyledBox>
        </Paper>
      </div>
    </div>
  );
};

export default Comments;
