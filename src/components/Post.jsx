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
import { ExpandMore, Favorite, FavoriteBorder } from "@mui/icons-material";

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
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>

      {/* ------Card Expand Content------ */}
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Method:</Typography>
          <Typography paragraph>{data.method}</Typography>
          <Typography>{data.methodTwo}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default Post;
