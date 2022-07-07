import React from "react";
import { useMutation, useQuery, gql } from "@apollo/client";
import { Image } from "cloudinary-react";
import axios from "axios";
// import css file from ilndex.css
import moment from "moment";
import "../index.css";

import {
  Avatar,
  Button,
  Fab,
  FormControl,
  FormHelperText,
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

const GET_POSTS = gql`
  query getPosts {
    getPosts {
      id
      title
      image
      date
      post
      liked
      user_id
    }
  }
`;

const ADD_POST = gql`
  mutation createPost(
    $title: String!
    $date: String!
    $image: String!
    $post: String!
    $user_id: Int!
  ) {
    createPost(
      title: $title
      date: $date
      image: $image
      post: $post
      user_id: $user_id
    ) {
      id
      title
      date
      image
      post
      liked
      user_id
    }
  }
`;

// Styled Modal on top of the default MUI Modal
const StyledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

// Styled Box on top of the default MUI Box
const UserBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

//Styled form
const StyledForm = styled(FormControl)({
  background: "white",
  padding: "1rem",
  borderRadius: "0.7rem",
  gap: "0.2rem",
});

// Remove image upload button from the form
const Input = styled("input")({
  display: "none",
});

const CreatePost = () => {
  const [open, setOpen] = React.useState(false);
  //add post date to useEffect

  // use useRef
  const ref = React.useRef();
  const toggleModal = () => {
    setOpen(!open);
  };
  const { user, userId } = React.useContext(UserContext);
  const [createPost, { data, loading, error }] = useMutation(ADD_POST);
  const [selectedImages, setSelectedImages] = React.useState([]);
  const [uploadPhoto, setUploadPhoto] = React.useState(null);
  const [togglePhoto, setTogglePhoto] = React.useState(false);
  const [postDate, setPostDate] = React.useState(
    moment().subtract(10, "days").calendar()
  );
  const [addPost, setAddPost] = React.useState({
    title: "",
    date: null,
    image: null,
    post: "",
  });

  const [postID, setPostID] = React.useState(null);

  console.log("DATE ------>", postDate);

  console.log("user on create post----->", user);
  console.log("userId on create post----->", userId);
  console.log("addPost on create post----->", data);

  //on post submit, scroll to top function call
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  // handle changes for posts  input fields
  function handleChange(e) {
    console.log(e.target.name, e.target.value);
    setAddPost({
      ...addPost,
      [e.target.name]: e.target.value,
    });
  }

  //upload image to Cloud
  function uploadImage(e) {
    const formData = new FormData();
    formData.append("file", selectedImages);
    formData.append("upload_preset", "xhfk3bp5_u");

    const postImage = async () => {
      try {
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dcvh93esc/upload",
          formData
        );
        console.log("response", response);
        // add response to my addPost image form
        setUploadPhoto(response.data.secure_url);
      } catch {
        console.log("error uploading image");
      }
    };
    postImage();
  }

  // handle submit for posts
  async function handleSubmit(e) {
    e.preventDefault();

    // add upload image to my submit form
    const newPost = await createPost({
      variables: {
        title: addPost.title,
        date: postDate,
        image: uploadPhoto,
        post: addPost.post,
        user_id: userId,
      },

      refetchQueries: [{ query: GET_POSTS }],
    });
    setPostID(newPost.data.createPost.id);
    setAddPost({
      title: "",
      date: "",
      image: "",
      post: "",
    });
    toggleModal();
    setUploadPhoto(null);
    scrollToTop();
    console.log("new post---------------------", newPost);

    return newPost;
  }

  if (loading) return <h1>Loading....</h1>;
  // if (error) return <h1>Error: Error....</h1>;
  console.log("error----->", error);
  console.log("myImage-----THIS ONE?>", uploadPhoto);
  console.log("postID---->", postID);

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
                {togglePhoto ? (
                  <>
                    <Avatar
                      src="https://i.pravatar.cc/300"
                      sx={{ border: "1px solid red", margin: "0 auto" }}
                    />
                    <Typography variant="h6">{user}</Typography>
                    <TextField
                      id="demo-helper-text-aligned"
                      label="title"
                      name="title"
                      onChange={handleChange}
                    />
                    {/* <TextField
                      id="demo-helper-text-aligned"
                      label="date"
                      name="date"
                      onChange={handleChange}
                    /> */}
                    <TextField
                      id="demo-helper-text-aligned"
                      label="content"
                      name="content"
                      onChange={handleChange}
                    />
                    <TextField
                      id="demo-helper-text-aligned"
                      label="post"
                      name="post"
                      onChange={handleChange}
                    />
                    <Button
                      variant="contained"
                      color="success"
                      type="submit"
                      onClick={handleSubmit}
                    >
                      Add Post
                    </Button>{" "}
                    <h2>Need to add Photo?</h2>
                    <button onClick={() => setTogglePhoto(!togglePhoto)}>
                      Upload Photo
                    </button>
                  </>
                ) : (
                  <>
                    <label htmlFor="icon-button-file">
                      <Input
                        accept="image/*"
                        id="icon-button-file"
                        type="file"
                        onChange={(e) => {
                          console.log("e.target.files", e.target.files);
                          setSelectedImages(e.target.files[0]);
                        }}
                      />
                      <IconButton
                        color="primary"
                        aria-label="upload picture"
                        component="span"
                      >
                        <PhotoCamera />
                      </IconButton>
                    </label>
                    <Image
                      cloudName="dcvh93esc"
                      publicId={`${uploadPhoto}`}
                      height="100"
                      width="100"
                      className={`displayNone`}
                      ref={ref}
                    />
                    {/* button to upload image to Cloud */}
                    <button
                      onClick={() => {
                        setTimeout(() => {
                          setTogglePhoto(!togglePhoto);
                        }, 4000);
                        uploadImage();
                      }}
                    >
                      Upload Image
                    </button>
                    <p>Post date: {postDate}</p>
                  </>
                )}
              </FormControl>
            </UserBox>
          </Box>
        </StyledModal>
      ) : null}
    </>
  );
};

export default CreatePost;
