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
const Post = ({ data }) => {
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
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
        title={data.title}
        subheader={data.date}
      />

      {/* Card Photo */}
      <CardMedia component="img" height="20%" image={data.image} />

      {/* Card Content */}
      <CardContent>
        <Typography variant="body2" color="customColor.main">
          {data.content}
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
          <Typography paragraph>Method:</Typography>
          <Typography paragraph>{data.method}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default Post;
