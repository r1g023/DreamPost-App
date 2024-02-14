import React from "react";
import { Navigate } from "react-router-dom";
import { useMutation, useQuery, gql } from "@apollo/client";
import { Image } from "cloudinary-react";
import axios from "axios";

import moment from "moment";

import ClearIcon from "@mui/icons-material/Clear";

import {
  Avatar,
  Button,
  Fab,
  FormControl,
  IconButton,
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
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import useCreatePostForm from "../formHooks/useCreatePostForm";
import jwt_decode from "jwt-decode";
import { toast } from "react-toastify";

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

// Remove image upload button from the form
const Input = styled("input")({
  display: "none",
  color: "white",
  background: "white",
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

  const [open, setOpen] = React.useState(false);

  const toggleModal = () => {
    setOpen(!open);
  };
  const { user, setUser } = React.useContext(UserContext);

  const [createPost, { data, loading, error }] = useMutation(ADD_POST);
  const [selectedImages, setSelectedImages] = React.useState([]);
  const [uploadPhoto, setUploadPhoto] = React.useState(null);
  const [togglePhoto, setTogglePhoto] = React.useState(false);
  const [startDate, setStartDate] = React.useState(
    // moment get current hour in PM or AM format
    moment().endOf("day").format("MM/DD/YYYY").toLocaleString("en-US")
  );

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  //upload image to Cloud
  function uploadImage(e) {
    const token = window.localStorage.getItem("auth-token");
    if (!token || (token && jwt_decode(token).exp * 1000 < Date.now())) {
      toast.error("Your session has expired. Please login again.", {
        autoClose: 5000,
        onClose: () => {
          setUser("");
        },
      });
    } else {
      //
      const formData = new FormData();
      formData.append("file", selectedImages);
      formData.append("upload_preset", "xhfk3bp5_u");

      const postImage = async () => {
        try {
          const response = await axios.post(
            "https://api.cloudinary.com/v1_1/dcvh93esc/upload",
            formData
          );

          setUploadPhoto(response.data.secure_url);
        } catch {
          throw new Error("Error uploading image");
        }
      };

      if (!selectedImages) {
        return false;
      } else {
        postImage();
      }
    }
  }

  async function handleSubmit(e) {
    // e.preventDefault();

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
              // might need to adjust this as the post modal sometimes does not look correct because of the margin,
              marginLeft: "-1rem",
            }}>
            {/*userbox of current logged in user.username */}
            <UserBox>
              {/*form */}

              <FormControl
                className="post-form-responsiveness"
                style={{
                  padding: "2rem",
                  borderRadius: "0.7rem",
                  gap: "0.2rem",
                  background: mode ? "#1B2430" : "white",
                  color: mode ? "white" : "black",

                  marginTop: "-50px",
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
                        sx={{ color: "red", background: "red" }}
                        onChange={(e) => {
                          setSelectedImages(e.target.files[0]);
                        }}
                      />
                      <IconButton
                        sx={{ color: mode ? "green" : "black" }}
                        aria-label="upload picture"
                        component="span">
                        <PhotoCamera />
                      </IconButton>
                    </label>
                    {uploadPhoto && (
                      <Image
                        style={{
                          height: "225px",
                          width: "200px",
                          display: "block",
                          margin: "0 auto",
                        }}
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
                      sx={{ marginTop: "1rem" }}
                      onClick={() => {
                        setUploadPhoto(null);
                        setTogglePhoto(!togglePhoto);
                      }}>
                      Cancel
                    </Button>
                  </>
                ) : (
                  <>
                    {/* add an X button to close modal */}
                    <span title="Close and cancel new post">
                      <ClearIcon
                        sx={{
                          cursor: "pointer",
                          fontSize: 40,
                          position: "absolute",
                          right: 20,
                          top: 20,
                        }}
                        color="error"
                        title="Close and cancel new post"
                        onClick={toggleModal}
                      />
                    </span>
                    <Avatar
                      src={user.avatar}
                      // src="https://i.pravatar.cc/300" //default random image
                      sx={{ border: "1px solid red", margin: "0 auto" }}
                    />
                    <Typography variant="h6" sx={{ color: "green" }}>
                      @{user.username}
                    </Typography>
                    <TextField
                      id="demo-helper-text-aligned"
                      label={
                        !uploadPhoto ? (
                          "Upload a photo first"
                        ) : (
                          <span
                            style={{
                              background: mode ? "white" : "",
                              color: mode ? "black" : "black",
                              fontSize: "1.2rem",
                              padding: "0.2rem",
                            }}>
                            Enter a Title
                          </span>
                        )
                      }
                      placeholder="Enter a title"
                      name="title"
                      onChange={handlePostChanges}
                      disabled={!uploadPhoto ? true : false}
                      sx={{
                        boxShadow: "0px 0px 12px 0px gray",
                        marginTop: "0.5rem",
                        width: "100%",
                        color: mode ? "red" : "black",
                        background: mode ? "white" : "",
                      }}
                    />
                    {/* error for title */}
                    {errors ? (
                      <p
                        style={{
                          color: "red",

                          fontSize: "14px",
                          textAlign: "left",
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
                      label={
                        !uploadPhoto
                          ? "Upload a photo first"
                          : "What's on your mind?"
                      }
                      name="post"
                      multiline
                      rows={4}
                      onChange={handlePostChanges}
                      sx={{
                        marginTop: "0.5rem",
                        width: "100%",

                        boxShadow: "0px 0px 12px 0px gray",
                        background: mode ? "white" : "",
                      }}
                      variant="standard"
                      color="otherColor"
                      disabled={!uploadPhoto ? true : false}
                    />
                    {/* error for post */}
                    {errors ? (
                      <p
                        style={{
                          color: "red",

                          fontSize: "14px",
                          textAlign: "left",
                        }}>
                        {" "}
                        {errors.post}
                      </p>
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
                        if (!uploadPhoto) {
                          window.alert("Please upload a photo");
                        }
                        handleSubmit();
                      }}>
                      <span style={{ color: "gray" }}>Submit</span>
                    </Button>{" "}
                    {/* <h2>Photo upload is required</h2> */}
                    <span style={{ fontSize: "12px" }}>
                      {!uploadPhoto ? (
                        <span style={{ color: "red" }}>
                          Photo upload is required
                        </span>
                      ) : (
                        <>
                          <span style={{ color: "green" }}>
                            Photo uploaded already, please enter a title and
                            post.
                          </span>
                          <br />
                          <br />

                          <Button
                            variant="outlined"
                            color="error"
                            sx={{ marginTop: "1rem" }}
                            onClick={() => {
                              setUploadPhoto(null);
                              setTogglePhoto(!togglePhoto);
                            }}>
                            Remove Photo
                          </Button>
                        </>
                      )}
                    </span>
                    <Button
                      variant="outlined"
                      disabled={uploadPhoto ? true : false}
                      onClick={() => {
                        if (!uploadPhoto) {
                          setTogglePhoto(!togglePhoto);
                        }
                        return;
                      }}
                      color="otherColor">
                      Upload Photo
                    </Button>
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
