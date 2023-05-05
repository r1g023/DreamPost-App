import React from "react";
import { useMutation, useQuery, gql } from "@apollo/client";
import { Image } from "cloudinary-react";
import axios from "axios";
// import css file from ilndex.css
import moment from "moment";
// import "../index.css"
import ClearIcon from "@mui/icons-material/Clear";

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
import { OpenInBrowser, PhotoCamera } from "@mui/icons-material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
// import useCreatePostForm
import useCreatePostForm from "../formHooks/useCreatePostForm";

const GET_POSTS = gql`
  query getPosts {
    getPosts {
      id
      title
      image
      date
      post
      liked
      user
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
    $user: String!
    $user_id: Int!
  ) {
    createPost(
      title: $title
      date: $date
      image: $image
      post: $post
      user: $user
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

const CreatePost = ({ mode, searchValue, setPostData, postData }) => {
  // form hooks
  const [value, setValue, errors, buttonDisabled, handlePostChanges] =
    useCreatePostForm({
      title: "",
      date: "",
      image: null,
      user: "",
      post: "",
    });

  console.log("value----->", value);

  const [open, setOpen] = React.useState(false);
  //add post date to useEffect

  const { refetch } = useQuery(GET_POSTS);

  const toggleModal = () => {
    setOpen(!open);
  };
  const { user } = React.useContext(UserContext);

  const [createPost, { data, loading, error }] = useMutation(ADD_POST);
  const [selectedImages, setSelectedImages] = React.useState([]);
  const [uploadPhoto, setUploadPhoto] = React.useState(null);
  const [togglePhoto, setTogglePhoto] = React.useState(false);
  const [startDate, setStartDate] = React.useState(
    // moment get current hour in PM or AM format
    moment().endOf("day").format("MM/DD/YYYY").toLocaleString("en-US")
  );

  // replaced  addPost and setAddPost formHooks
  // const [value, setValue] = React.useState({
  //   title: "",
  //   date: "",
  //   image: null,
  //   user: "",
  //   post: "",
  // });

  // console.log("user on create post----->", user);

  // console.log("value on create post----->", data);

  //on post submit, scroll to top function call

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  //upload image to Cloud
  function uploadImage(e) {
    const formData = new FormData();
    formData.append("file", selectedImages);
    formData.append("upload_preset", "xhfk3bp5_u");
    console.log("post on image upload test");
    console.count("post on image count:");

    const postImage = async () => {
      try {
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dcvh93esc/upload",
          formData
        );
        console.log("response", response);
        // add response to my value image form
        setUploadPhoto(response.data.secure_url);
      } catch {
        console.log("error uploading image");
      }
    };

    // do not post if no image is selected
    if (!selectedImages) {
      return false;
    } else {
      postImage();
    }
  }

  // handle submit for posts
  async function handleSubmit(e) {
    // e.preventDefault();

    // add upload image to my submit form
    const newPost = await createPost({
      variables: {
        title: value.title,
        date: startDate,
        image: uploadPhoto,
        post: value.post,
        user: user.username,
        user_id: user.id,
      },

      refetchQueries: [{ query: GET_POSTS }],
    });
    setValue({
      title: "",
      date: "",
      image: "",
      user: "",
      post: "",
    });
    toggleModal();
    setUploadPhoto(null);
    scrollToTop();

    if (postData) {
      // window.location.reload();
      window.alert("Post created successfully, clear or refresh to see it");
    }
  }

  if (loading) return <h1>Loading....</h1>;
  // if (error) return <h1>Error: Error....</h1>;
  // console.log("error----->", error);
  // console.log("myImage-----THIS ONE?>", uploadPhoto);

  return (
    <>
      <Tooltip
        onClick={() => {
          // this will ensure that the user cannot create a post without uploading an image first
          if (!uploadPhoto) {
            setTogglePhoto(true);
          }
          toggleModal();
        }}
        title="Create Post"
        sx={{
          position: "fixed",
          bottom: 20,
          left: { xs: "calc(50% - 25px)", md: 30 },
        }}>
        <Fab color={mode ? "" : "primary"} aria-label="add">
          <AddIcon />
        </Fab>
      </Tooltip>

      {/* Modal to create a new post */}
      {open ? (
        <StyledModal
          open={open}
          onClose={toggleModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description">
          <Box
            p={3}
            width={300}
            height={420}
            bgcolor="white"
            borderRadius={"10px"}
            textAlign="center"
            sx={{
              background: "none",

              display: "flex",
              justifyContent: "center",
            }}>
            {/*userbox of current logged in user.username */}
            <UserBox>
              {/*form */}

              <FormControl
                style={{
                  padding: "2rem",
                  borderRadius: "0.7rem",
                  gap: "0.2rem",
                  background: mode ? "#1B2430" : "",
                  color: mode ? "white" : "",
                  marginTop: "3rem",
                  // add halo box shadow around the form

                  boxShadow: "0px 0px 12px 0px orange",
                }}>
                {togglePhoto ? (
                  <>
                    <label htmlFor="icon-button-file">
                      <label htmlFor="image" style={{ display: "block" }}>
                        Click the camera icon to select a Photo
                      </label>
                      {/*camera Icon */}
                      <Input
                        accept="image/*"
                        id="icon-button-file"
                        type="file"
                        sx={{ color: "red" }}
                        onChange={(e) => {
                          console.log("e.target.files", e.target.files);
                          setSelectedImages(e.target.files[0]);
                        }}
                      />
                      <IconButton
                        color="primary"
                        aria-label="upload picture"
                        component="span">
                        <PhotoCamera />
                      </IconButton>
                    </label>
                    {uploadPhoto && (
                      <Image
                        cloudName="dcvh93esc"
                        publicId={`${uploadPhoto}`}
                      />
                    )}
                    {/* button to upload image to Cloud */}
                    {!uploadPhoto && (
                      <CloudUploadIcon
                        color="otherColor"
                        sx={{
                          fontSize: 50,
                          cursor: "pointer",
                          margin: "0 auto",
                          marginTop: "3rem",
                        }}
                        onClick={() => {
                          // setTimeout(() => {
                          //   setTogglePhoto(!togglePhoto);
                          // }, 5000);
                          if (uploadImage) {
                            uploadImage();
                            // Remove the image from the input
                            setSelectedImages(null);
                          }
                          if (!selectedImages && !uploadPhoto) {
                            window.alert("Please select an image");
                          }
                        }}
                      />
                    )}
                    {!uploadPhoto && (
                      <p style={{ color: "gray" }}>
                        Click Cloud upload to add photo
                      </p>
                    )}
                    {uploadPhoto && (
                      <Button
                        variant="contained"
                        color="success"
                        sx={{ marginTop: 5 }}
                        onClick={() => setTogglePhoto(!togglePhoto)}>
                        Submit
                      </Button>
                    )}
                    <Button
                      variant="outlined"
                      color="error"
                      sx={{ marginTop: "3rem" }}
                      onClick={() => {
                        // fix toggle when canceling photo upload
                        setUploadPhoto(null);
                        setTogglePhoto(!togglePhoto);
                      }}>
                      Cancel
                    </Button>
                  </>
                ) : (
                  <>
                    <Avatar
                      src={user.avatar}
                      // src="https://i.pravatar.cc/300" //default random image
                      sx={{ border: "1px solid red", margin: "0 auto" }}
                    />
                    <Typography variant="h6" sx={{ color: "green" }}>
                      @{user.username}
                    </Typography>
                    {/* if no upload photo then disable title and post */}
                    <TextField
                      id="demo-helper-text-aligned"
                      label="Post Title"
                      name="title"
                      onChange={handlePostChanges}
                      disabled={!uploadPhoto ? true : false}
                      sx={{
                        boxShadow: "0px 0px 12px 0px gray",
                        background: mode ? "white" : "",
                      }}
                    />
                    {/* error for title */}
                    {errors ? (
                      <p
                        style={{
                          color: "red",
                          fontSize: "12px",

                          textAlign: "left",
                          padding: "0.5rem",
                          maxWidth: "250px",
                          width: "100%",
                        }}>
                        {errors.title}
                      </p>
                    ) : (
                      ""
                    )}
                    {/* <TextField
                      id="demo-helper-text-aligned"
                      label="post"
                      name="post"
                      onChange={handlePostChanges}
                      sx={{ marginTop: "0.5rem" }}
                    /> */}
                    <TextField
                      id="standard-multiline-static"
                      label="What's on your mind?"
                      name="post"
                      multiline
                      rows={4}
                      onChange={handlePostChanges}
                      sx={{
                        marginTop: "0.5rem",
                        width: "100%",
                        padding: "0.5rem",
                        boxShadow: "0px 0px 12px 0px gray",
                        background: mode ? "white" : "",
                      }}
                      variant="standard"
                      color="otherColor"
                      disabled={!uploadPhoto ? true : false}
                    />
                    {/* error for post */}
                    {errors ? (
                      <p style={{ color: "red" }}> {errors.post}</p>
                    ) : null}
                    <br />
                    <Button
                      variant="contained"
                      color="success"
                      type="submit"
                      disabled={buttonDisabled}
                      sx={{
                        border: mode ? "1px solid white" : "",
                        color: mode ? "white" : "",
                      }}
                      onClick={() => {
                        // if no image is uploaded, alert user to upload image first
                        if (!uploadPhoto) {
                          window.alert("Please upload a photo");
                        }
                        handleSubmit();
                      }}>
                      {/* add grayish color to button when disabled, enclose in span */}
                      <span style={{ color: "gray" }}>Submit</span>
                    </Button>{" "}
                    {/* <h2>Photo upload is required</h2> */}
                    <span style={{ fontSize: "12px" }}>
                      Don't forget to upload a photo
                    </span>
                    <Button
                      variant="outlined"
                      onClick={() => {
                        // if no upload photo then don't allow user to submit
                        if (!uploadPhoto) {
                          setTogglePhoto(!togglePhoto);
                        }
                        return;
                      }}
                      color="otherColor">
                      Upload Photo
                    </Button>
                    {/* add an X button to close modal */}
                    <span title="Close and cancel new post">
                      <ClearIcon
                        sx={{
                          cursor: "pointer",
                          marginTop: "1rem",
                        }}
                        color="error"
                        title="Close and cancel new post"
                        onClick={toggleModal}
                      />
                    </span>
                  </>
                )}
              </FormControl>
            </UserBox>
          </Box>
          {/* add an X button to close modal */}
        </StyledModal>
      ) : null}
    </>
  );
};

export default CreatePost;
