import React from "react";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Checkbox,
  Collapse,
  IconButton,
  Typography,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import styled from "@emotion/styled";
import { gql, useQuery, useMutation } from "@apollo/client";
import { UserContext } from "../App";

import Comments from "./Comments";
import Modal from "./Modal";

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

// GET POSTS option from the database
const GET_POSTS = gql`
  query getPosts {
    getPosts {
      id
      post
      user
      post_id
      comments {
        id
        comment
        user
        post_id
      }
    }
  }
`;

const ADD_COMMENT = gql`
  mutation addComment($comment: String!, $user: String!, $post_id: Int!) {
    addComment(comment: $comment, user: $user, post_id: $post_id) {
      id
      comment
      user
      count
      post_id
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
const Post = ({ post }) => {
  console.log("Post data on Post component---->", post);
  // const [toggleModal, setToggleModal] = React.useState(false);
  const [editComment, setEditComment] = React.useState("");

  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  // get comments from the database using the GET_COMMENTS query
  const { data, error, loading } = useQuery(GET_COMMENTS);
  // get mutation for delete comment
  const [deleteCommentID] = useMutation(DELETE_COMMENT);
  const [updateCommentID] = useMutation(UPDATE_COMMENT);

  React.useEffect(() => {
    console.log("comment data on Post.jsx USE EFFECT---->", data);
  }, [data]);

  const { user } = React.useContext(UserContext);
  // add comment to mutation
  const [addComment] = useMutation(ADD_COMMENT);

  // add comment post object
  const [comment, setComment] = React.useState({
    id: "",
    comment: "",
    user: "",
    liked: false,
    count: 0,
    post_id: "",
  });

  // Add new comment to comment list
  const handleSubmit = async (e) => {
    e.preventDefault();
    let newComment = await addComment({
      variables: {
        comment: comment.comment,
        user: user.username,
        post_id: post.id,
      },
      refetchQueries: [{ query: GET_COMMENTS }],
    });
    setComment({
      comment: "",
      user: "",
      post_id: "",
    });
    console.log("newComment", newComment);
    return newComment;
  };

  //handle change for add comment
  const handleChange = (e) => {
    setComment({ ...comment, [e.target.name]: e.target.value });
  };

  // handle delete comment
  const handleCommentDelete = async (comment) => {
    let deletedComment = await deleteCommentID({
      variables: { id: comment.id },
      //get from cache and update upon delete instead of refetching comment query
      update: (cache) => {
        console.log("comment cache--->", cache);
        const prevData = cache.readQuery({ query: GET_COMMENTS });
        console.log("prevData--->", prevData);
        const newData = prevData.getComments.filter(
          (item) => item.id !== comment.id
        );
        console.log("newData--->", newData);
        // once all data has been cleared from cache and added to newData, write it back to the cache so that when comment is deleted, it will query comments array and  and update the comment array with the new data array
        cache.writeQuery({
          query: GET_COMMENTS,
          data: { getComments: newData },
        });
      },
    });
    return deletedComment;
  };

  // handle update comment and like
  const handleCommentLike = (comment) => {
    console.log("comment on handleCommentLike--->", comment);
    updateCommentID({
      variables: {
        id: comment.id,
        liked: !comment.liked,
        count: !comment.liked ? comment.count + 1 : comment.count - 1,
      },
    });
  };

  // handle comment edit and update
  const handleCommentEdit = (comment) => {
    console.log("comment on handleCommentEdit--->", comment);
    // e.preventDefault();
    updateCommentID({
      variables: {
        id: comment.id,
        comment: editComment,
      },
    });
  };

  // handle comment edit and update
  const handleCommentUpdate = (e) => {
    setEditComment(e.target.value);
  };

  console.log("data----> comment----->", data);

  console.log("user on POST COMMENT ---->", user);
  return (
    <>
      {console.log("component did render first time")}{" "}
      <Card sx={{ margin: 5 }}>
        {/* Card Header */}
        <CardHeader
          avatar={
            <Avatar sx={{ background: "navy" }} aria-label="recipe">
              {post.user.charAt(0)}
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={post.title}
          subheader={post.date}
        />
        <h4>User: {post.user} </h4>
        <h2>USER_ID: {post.user_id}</h2>
        <h3>Post_id: {post.id}</h3>

        {/* Card Photo */}

        <CardMedia component="img" height="20%" image={post.image} />

        {/* Card Content */}
        <CardContent>
          <Typography variant="body2" color="customColor.main">
            Post: {post.post}
          </Typography>
        </CardContent>

        {/* Card Like Icon, share button and expand button */}
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <Checkbox
              icon={<FavoriteBorder />}
              checkedIcon={<Favorite color="secondary" />}
            />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
          {/* Card Expand Button */}
          <ExpandMore
            expand={expanded} // false
            onClick={handleExpandClick} // toggle true || false
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>

        {/* ------Card Expand Content------ */}
        <Collapse in={expanded} timeout={1000} unmountOnExit>
          <CardContent>
            <Typography paragraph>Comments:</Typography>
            {/* Add Comment Form */}
            <form onSubmit={handleSubmit} className="mb3">
              <input
                type="text"
                className="pa2 f4 b--dashed"
                name="comment"
                value={comment.comment}
                placeholder="Add a comment..."
                onChange={handleChange}
              />

              <button className="pa2 f4 bg-green">Add Todo</button>
            </form>
            {/* form for updating a comment, open modal*/}
            {/* {!toggleModal ? (
              <Modal onCancel={() => setToggleModal(!toggleModal)}>
                <input
                  type="text"
                  className="pa2 f4 b--dashed"
                  name="editComment"
                  value={editComment}
                  placeholder="Edit a comment..."
                  onChange={(e) => setEditComment(e.target.value)}
                />
              </Modal>
            ) : null} */}

            <>
              <p>Comment Edit: {editComment}</p>
            </>

            {data &&
              data.getComments
                .map((item) => {
                  console.log("item in post for comments---->", item);

                  if (item.post_id === post.id) {
                    return (
                      <Comments
                        {...item}
                        key={item.id}
                        handleCommentDelete={() => handleCommentDelete(item)}
                        handleCommentLike={() => handleCommentLike(item)}
                        handleCommentEdit={() => handleCommentEdit(item)}
                        setEditComment={handleCommentUpdate}
                        editComment={editComment}
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
