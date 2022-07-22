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
import { Favorite, FavoriteBorder, ThumbUpAlt } from "@mui/icons-material";
import { UserContext } from "../App";
import SvgIcon from "@mui/material/SvgIcon";

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

function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

const Comments = ({
  id,
  comment,
  liked,
  count,
  user,
  handleCommentDelete,
  handleCommentLike,
  handleCommentEdit,
  commentData,
}) => {
  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  const currentUser = React.useContext(UserContext);
  // get current loggedIn user
  const isCurrentUser = currentUser.user.username === user;
  const [counter, setCounter] = React.useState(count);

  React.useEffect(() => {
    // keep track of commentData
  }, [commentData]);

  console.log("Comment user-->", id, liked, count, user);
  console.log("COMMENT ----> currentUser -->", currentUser);
  console.log("commentData -->", commentData);

  // React.useEffect(() => {}, []);
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
              <h4
                style={{
                  margin: 0,
                  textAlign: "left",
                  color: isCurrentUser ? "green" : "",
                }}
              >
                User: {user}
              </h4>
              <p style={{ textAlign: "left" }}>{comment}</p>
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
              {/* like the comment if user has not liked the comment */}
              {!liked && user && (
                <span
                  class="material-icons"
                  onClick={() => handleCommentLike(id)}
                >
                  thumb_up_alt
                </span>
              )}
              {/* unlike the comment if user has liked the comment */}
              {liked && (
                <span
                  class="material-icons"
                  style={{ color: "green" }}
                  onClick={() => handleCommentLike(id)}
                >
                  thumb_up_alt
                </span>
              )}

              {/* show number of likes */}

              <h5>{count} Likes</h5>
            </Box>

            {/* container for edit and delete buttons */}
            <StyledDeleteEditBox
              sx={{ border: "1px solid green", width: "70%" }}
            >
              {/* Edit comment button, only show if the current logged in user made the comment*/}
              {isCurrentUser && (
                <>
                  <i
                    className="fa fa-edit"
                    style={{ color: "red" }}
                    onClick={() => handleCommentEdit(id)}
                  ></i>
                  {/* Delete comment button */}
                  <IconButton
                    aria-label="delete"
                    size="large"
                    color="secondary"
                    onClick={() => handleCommentDelete(id)}
                  >
                    <DeleteIcon fontSize="inherit" />
                  </IconButton>
                </>
              )}
            </StyledDeleteEditBox>
          </StyledBox>
        </Paper>
      </div>
    </div>
  );
};

export default Comments;
