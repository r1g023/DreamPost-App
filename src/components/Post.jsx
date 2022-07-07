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

// get GET COMMENTS option from the database
const GET_COMMENTS = gql`
  query getComments {
    getComments {
      id
      comment
    }
  }
`;

// GET POSTS option from the database
const GET_POSTS = gql`
  query getPosts {
    getPosts {
      id
      post
      comments {
        id
        comment
      }
    }
  }
`;

const ADD_COMMENT = gql`
  mutation addComment($comment: String!, $post_id: Int!) {
    addComment(comment: $comment, post_id: $post_id) {
      id
      comment
      post_id
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

  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  // get comments from the database using the GET_COMMENTS query
  const { data, error, loading } = useQuery(GET_COMMENTS);

  // React.useEffect(() => {
  //   console.log("post data on Post USE EFFECT---->", post);
  // }, [data]);

  const { user } = React.useContext(UserContext);
  // add comment to mutation
  const [addComment] = useMutation(ADD_COMMENT);

  // add comment post object
  const [comment, setComment] = React.useState({
    comment: "",
    post_id: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newComment = await addComment({
      variables: {
        comment: comment.comment,
        post_id: post.id,
        user: user,
      },
      refetchQueries: [{ query: GET_POSTS }],
    });
    setComment({
      comment: "",
      post_id: "",
    });
    console.log("newComment", newComment);
    return newComment;
  };

  //handle change for add comment
  const handleChange = (e) => {
    setComment({ ...comment, [e.target.name]: e.target.value });
  };

  console.log("data----> comment----->", data);
  return (
    <>
      <Card sx={{ margin: 5 }}>
        {/* Card Header */}
        <CardHeader
          avatar={
            <Avatar sx={{ background: "navy" }} aria-label="recipe">
              R
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
            {data &&
              post.comments.map((item) => (
                <Comments commentData={item} key={item.id} user={user} />
              ))}
          </CardContent>
        </Collapse>
      </Card>
    </>
  );
};

export default Post;
