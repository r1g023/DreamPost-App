import React from "react";

import {
  Avatar,
  Button,
  Fab,
  FormControl,
  IconButton,
  InputLabel,
  Modal,
  styled,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Box } from "@mui/system";
import { UserContext } from "../App";
import { PhotoCamera } from "@mui/icons-material";

const StyledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const UserBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const Input = styled("input")({
  display: "none",
});

const CreatePost = () => {
  const [open, setOpen] = React.useState(false);
  const toggleModal = () => {
    setOpen(!open);
  };
  const { user, setUser } = React.useContext(UserContext);
  const [addPost, setAddPost] = React.useState({
    title: "",
    date: "",
    image: null,
    content: "",
    method: "",
    liked: false,
  });

  function handleChange(e) {
    console.log(e.target.name, e.target.value, e.target.files);
    setAddPost({
      ...addPost,
      [e.target.name]:
        e.target.type === "file" ? e.target.files[0] : e.target.value,
    });
  }

  return (
    <>
      <Tooltip
        onClick={toggleModal}
        title="Delete"
        sx={{
          position: "fixed",
          bottom: 20,
          left: { xs: "calc(50% - 25px)", md: 30 },
        }}
      >
        <Fab color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </Tooltip>

      {/* Modal to create a new post */}
      {open ? (
        <StyledModal
          open={open}
          onClose={toggleModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            width={300}
            height={420}
            bgcolor="white"
            borderRadius={"10px"}
            p={3}
            textAlign="center"
          >
            {/*userbox of current logged in user */}
            <UserBox>
              {/*form */}

              <FormControl
                style={{
                  background: "white",
                  padding: "1rem",
                  borderRadius: "0.7rem",
                  gap: "0.2rem",
                }}
              >
                <Avatar
                  src="https://i.pravatar.cc/300"
                  sx={{ border: "1px solid red", margin: "0 auto" }}
                />
                <Typography variant="h6">{user}</Typography>
                {/* title, date, image, content, method & methodTwo to create a new post */}
                <TextField
                  id="demo-helper-text-aligned"
                  label="title"
                  name="title"
                  onChange={handleChange}
                />

                <TextField
                  id="demo-helper-text-aligned"
                  label="date"
                  name="date"
                  onChange={handleChange}
                />

                <TextField
                  id="demo-helper-text-aligned"
                  label="content"
                  name="content"
                  onChange={handleChange}
                />

                <TextField
                  id="demo-helper-text-aligned"
                  label="method"
                  name="method"
                  onChange={handleChange}
                />

                <label htmlFor="icon-button-file">
                  <Input
                    accept="image/*"
                    id="icon-button-file"
                    type="file"
                    onChange={handleChange}
                  />
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                  >
                    <PhotoCamera />
                  </IconButton>
                </label>
                <Button variant="contained" color="success">
                  Add Post
                </Button>
              </FormControl>
            </UserBox>
            <p>Title {addPost.title}</p>
            <p>Date {addPost.date}</p>
            <p>Content {addPost.content}</p>
            <p>Method {addPost.method}</p>
          </Box>
        </StyledModal>
      ) : null}
    </>
  );
};

export default CreatePost;
