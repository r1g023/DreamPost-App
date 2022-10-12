import React from "react";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Checkbox,
  Collapse,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import styled from "@emotion/styled";
import { gql, useQuery, useMutation } from "@apollo/client";
import PostsModal from "../pages/PostsModal";
import PostShareButtons from "../pages/PostShareButtons";
import { UserContext } from "../App";

import Comments from "./Comments";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const options = ["delete"];

// get GET COMMENTS option from the database
const GET_COMMENTS = gql`
  query getComments {
    getComments {
      id
      comment
      liked
      count
      user
      post_id
      date
    }
  }
`;

// Delete comment by ID if logged in user
const DELETE_COMMENT = gql`
  mutation deleteCommentById($id: Int!) {
    deleteCommentID(id: $id) {
      id
      comment
      liked
      count
      post_id
    }
  }
`;

// // GET POSTS option from the database
// const GET_POSTS = gql`
//   query getPosts {
//     getPosts {
//       id
//       post
//       user
//       post_id
//       comments {
//         id
//         comment
//         user
//         post_id
//       }
//     }
//   }
// `;

// const GET_USERS = gql`
//   query getUsers {
//     getUsers {
//       id
//       first_name
//       last_name
//       dob
//       email
//       username
//       role
//       avatar
//       dark_mode
//       about_you
//       created_at
//       updated_at
//       posts {
//         id
//         title
//         date
//         image
//         comments {
//           id
//           comment
//           user
//           post_id
//         }
//       }
//       comments {
//         id
//         comment
//         liked
//         count
//         user
//         post_id
//       }
//     }
//   }
// `;

const ADD_COMMENT = gql`
  mutation addComment(
    $comment: String!
    $user: String!
    $post_id: Int!
    $date: String
  ) {
    addComment(comment: $comment, user: $user, post_id: $post_id, date: $date) {
      id
      comment
      user
      count
      post_id
      date
    }
  }
`;

const UPDATE_COMMENT = gql`
  mutation updateCommentID(
    $id: Int!
    $comment: String
    $liked: Boolean
    $count: Int
  ) {
    updateCommentID(id: $id, comment: $comment, liked: $liked, count: $count) {
      id
      comment
      liked
      count
    }
  }
`;

// drop down arrow on comments
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

// Post Card for the Post List on the Feed component
const Post = ({ post, handlePostDelete, mode, userList }) => {
  // console.log("Post data on Post component---->", post);
  const [toggleModal, setToggleModal] = React.useState(false);
  const [editComment, setEditComment] = React.useState("");

  const [startDate, setStartDate] = React.useState(
    moment().format("MM/DD/YYYY")
  );

  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  // for post delete
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // get comments from the database using the GET_COMMENTS query
  const { data, error, loading } = useQuery(GET_COMMENTS);
  // GET users from query

  React.useEffect(() => {
    // console.log("comment data on Post.jsx USE EFFECT---->", data);
    //reload comments after submitting
  }, [data]);

  // get mutation for delete comment
  const [deleteCommentID] = useMutation(DELETE_COMMENT);
  const [updateCommentID] = useMutation(UPDATE_COMMENT);
  const [addComment] = useMutation(ADD_COMMENT);
  const [commentUpdateToggle, setCommentUpdateToggle] = React.useState(false);
  const { user } = React.useContext(UserContext);
  // add comment to mutation

  // add comment post object
  const [comment, setComment] = React.useState({
    id: "",
    comment: "",
    user: "",
    liked: false,
    count: 0,
    post_id: "",
    date: "",
  });

  // Add new comment to comment list
  const handleSubmit = async (e) => {
    e.preventDefault();
    let newComment = await addComment({
      variables: {
        comment: comment.comment,
        user: user.username,
        post_id: post.id,
        date: startDate,
      },
      refetchQueries: [{ query: GET_COMMENTS }],
    });
    setComment({
      comment: "",
      user: "",
      post_id: "",
      date: "",
    });
  };

  //handle change for add comment
  const handleChange = (e) => {
    setComment({ ...comment, [e.target.name]: e.target.value });
  };

  // handle delete comment
  const handleCommentDelete = async (comment) => {
    let confirmDelete = window.confirm(
      "Are you sure you want to delete this comment?"
    );
    if (confirmDelete) {
      let deletedComment = await deleteCommentID({
        variables: { id: comment.id },
        //get from cache and update upon delete instead of refetching comment query
        update: (cache) => {
          // console.log("comment cache--->", cache);
          const prevData = cache.readQuery({ query: GET_COMMENTS });
          // console.log("prevData--->", prevData);
          const newData = prevData.getComments.filter(
            (item) => item.id !== comment.id
          );
          // console.log("newData--->", newData);
          // once all data has been cleared from cache and added to newData, write it back to the cache so that when comment is deleted, it will query comments array and  and update the comment array with the new data array
          cache.writeQuery({
            query: GET_COMMENTS,
            data: { getComments: newData },
          });
        },
      });
      return deletedComment;
    }
  };

  // handle update comment and like
  const handleCommentLike = (comment) => {
    // console.log("comment on handleCommentLike--->", comment);
    updateCommentID({
      variables: {
        id: comment.id,
        liked: !comment.liked,
        count:
          comment.count +
          1 *
            (user.username === comment.user && comment.liked === true ? -1 : 1),
      },
    });
  };

  // handle comment edit and update
  const handleCommentEdit = (comment) => {
    updateCommentID({
      variables: {
        // iterate on comment.id and find the comment that matches the id and update the comment
        id: comment.id,
        comment: editComment,
      },
    });
    setCommentUpdateToggle(false);
  };

  // handle comment edit and update
  const handleCommentUpdate = (e) => {
    // only edit the selected comment
    setEditComment(e.target.value);
  };

  // console.log("data----> comment----->", data);

  // console.log("user on POST COMMENT ---->", user);

  const isCurrentUser = user.username === post.user;
  const loggedInUser = user.username === user;

  return (
    <>
      <Card
        sx={{
          margin: "0 auto",
          marginTop: "1rem",
          background: mode ? "#2C394B" : "white",
          color: mode ? "white" : "black",
          maxWidth: "350px",
          width: "100%",
        }}
      >
        {/* Card Header */}
        <CardHeader
          avatar={
            <Avatar
              sx={{ background: "navy" }}
              aria-label="recipe"
              src={
                //iterate over userListData and find the user with the username that matches the post.user

                userList &&
                userList.getUsers.find((user) => user.username === post.user)
                  .avatar
              }
            >
              {/* iterate over userListData.data.getUsers to get the user's avatar */}
            </Avatar>
          }
          action={
            <IconButton
              aria-label="more"
              id="long-button"
              aria-controls={open ? "long-menu" : null}
              aria-expanded={open ? "true" : null}
              aria-haspopup="true"
              onClick={handleClick}
              sx={{ color: mode ? "white" : "black" }}
            >
              <MoreVertIcon />
            </IconButton>
          }
          title={post.title}
          subheader={
            <React.Fragment>
              <Typography
                component="span"
                fontWeight="fontWeightBold"
                variant="body2"
                color="text.primary"
              >
                <span style={{ color: mode ? "white" : "", fontSize: "10px" }}>
                  posted on {post.date}
                </span>
              </Typography>
            </React.Fragment>
          }
        />

        <h4
          style={{
            padding: isCurrentUser ? "2px" : "2px",
            background: isCurrentUser ? "green" : "#002A53",
            color: "white",
            width: isCurrentUser ? "20%" : "20%",
            textAlign: isCurrentUser ? "center" : "center",
            borderRadius: isCurrentUser ? "10px" : "10px",
            margin: "5px",
          }}
        >
          @{post.user}
        </h4>

        {/* Menu to delete post */}

        {isCurrentUser && (
          <Menu
            id="long-menu"
            MenuListProps={{
              "aria-labelledby": "long-button",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            PaperProps={{
              style: {
                maxHeight: 15 * 4.5,
                width: "9ch",
              },
            }}
          >
            {options.map((option) => (
              <MenuItem key={option} onClick={() => handlePostDelete(post.id)}>
                {option}
              </MenuItem>
            ))}
          </Menu>
        )}

        {/* Card Photo */}
        <CardMedia component="img" height="20%" image={post.image} />

        {/* Card Content */}
        <CardContent>
          <Typography variant="body2" color={mode ? "whiteColor" : ""}>
            {post.post}
          </Typography>
        </CardContent>

        {/* Card Like Icon, share button and expand button */}
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites" sx={{ color: "white" }}>
            <Checkbox
              icon={<FavoriteBorder sx={{ color: mode ? "white" : "" }} />}
              checkedIcon={<Favorite color="secondary" />}
            />
          </IconButton>
          <IconButton
            aria-label="share"
            sx={{ color: mode ? "white" : "" }}
            onClick={() => setToggleModal(!toggleModal)}
          >
            <ShareIcon />
          </IconButton>

          {/* Card Expand Button */}
          <ExpandMore
            expand={expanded} // false
            onClick={handleExpandClick} // toggle true || false
            aria-expanded={expanded}
            aria-label="show more"
            sx={{ color: mode ? "white" : "" }}
          >
            <ExpandMoreIcon />
          </ExpandMore>
          <span style={{ fontSize: "13px" }}>Comments</span>
        </CardActions>

        {/* {toggleModal */}
        {toggleModal && (
          <PostsModal onCancel={() => setToggleModal(false)}>
            <PostShareButtons />
          </PostsModal>
        )}

        {/* ------Card Expand Content------ */}
        <Collapse in={expanded} timeout={1000} unmountOnExit>
          <CardContent>
            <h3>Comments</h3>
            {/* Add Comment Form */}
            <form onSubmit={handleSubmit} className="mb3">
              <textarea
                style={{ display: "block", width: 253, maxWidth: 253 }}
                name="comment"
                placeholder="Add a comment..."
                value={comment.comment}
                onChange={handleChange}
              />

              <Button
                variant="outlined"
                sx={{
                  padding: "3px",
                  marginTop: "10px",
                  color: mode ? "white" : "002A53",
                  borderColor: mode ? "white" : "002A53",
                }}
                type="submit"
              >
                Add Comment
              </Button>
            </form>

            {data &&
              data.getComments
                .map((item) => {
                  console.log("items---comments--->", item);
                  if (item.post_id === post.id) {
                    return (
                      <Comments
                        {...item}
                        key={item.id}
                        handleCommentDelete={() => handleCommentDelete(item)}
                        handleCommentLike={() => handleCommentLike(item)}
                        handleCommentEdit={() => {
                          handleCommentEdit((item) => {
                            item.find((item) => item === item.id);
                          });
                        }}
                        setEditComment={handleCommentUpdate}
                        editComment={editComment}
                        setCommentUpdateToggle={setCommentUpdateToggle}
                        commentUpdateToggle={commentUpdateToggle}
                        commentData={data}
                        mode={mode}
                      />
                    );
                  }
                })
                .reverse()}
          </CardContent>
        </Collapse>
      </Card>
    </>
  );
};

export default Post;
