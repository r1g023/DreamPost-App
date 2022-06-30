import React from "react";
import { useMutation, useQuery, gql } from "@apollo/client";
import { Image } from "cloudinary-react";
import axios from "axios";

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

const GET_POSTS = gql`
  query getPosts {
    getPosts {
      id
      title
      image
      date
      content
      method
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
    $content: String!
    $method: String!
    $user_id: Int!
  ) {
    createPost(
      title: $title
      date: $date
      image: $image
      content: $content
      method: $method
      user_id: $user_id
    ) {
      id
      title
      date
      image
      content
      method
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
  const { user, userId } = React.useContext(UserContext);
  const [createPost, { data, loading, error }] = useMutation(ADD_POST);
  const [selectedImages, setSelectedImages] = React.useState([]);
  const [myImage, setMyImage] = React.useState(null);
  const [addPost, setAddPost] = React.useState({
    title: "",
    date: "",
    image: "",
    content: "",
    method: "",
  });
  console.log("addPost---->", addPost);

  React.useEffect(() => {
    console.log("useEffect for image upload");
  }, []);

  console.log("user on create post----->", user);
  console.log("userId on create post----->", userId);
  console.log("post data--->", data);

  // Post button, opens the modal
  // const toggleModal = () => {
  //   setOpen(!open);
  // };

  // handle changes for posts  input fields
  function handleChange(e) {
    console.log(e.target.name, e.target.value || e.target.files);
    // console.log("e.target.files", e.target.files);

    setAddPost({
      ...addPost,
      [e.target.name]:
        e.target.type === "file" ? e.target.files[0] : e.target.value,
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
        setMyImage(response.data.secure_url);
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
        date: addPost.date,
        image: myImage,
        content: addPost.content,
        method: addPost.method,
        user_id: userId,
      },
      onCompleted: (data) => {
        console.log("data", data);
      },

      refetchQueries: [{ query: GET_POSTS }],
    });
    console.log("new post---------------------", newPost);
    return newPost;
  }

  if (loading) return <h1>Loading....</h1>;
  // if (error) return <h1>Error: Error....</h1>;
  console.log("error----->", error);
  console.log("myImage-----THIS ONE?>", myImage);

  return (
    <>
      {/* <Tooltip
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
      {/* {open ? ( */}
      {/* <StyledModal
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
      {/* <UserBox>
            form */}
      <form onSubmit={handleSubmit}>
        {/* generate inputs for createPost*/}
        <input
          type="text"
          name="title"
          value={addPost.title}
          onChange={handleChange}
          placeholder="Title"
        />

        {/* generate remaining inputs */}
        <input
          type="text"
          name="date"
          value={addPost.date}
          onChange={handleChange}
          placeholder="Date"
        />

        {/* *--------------------image input------------------------- */}
        {/* <input type="file" id="image" name="image" onChange={handleChange} />
        <button onClick={uploadImage}>Upload image</button> */}

        <input
          type="text"
          name="content"
          value={addPost.content}
          onChange={handleChange}
          placeholder="Content"
        />
        <input
          type="text"
          name="method"
          value={addPost.method}
          onChange={handleChange}
          placeholder="Method"
        />

        <button>Create post</button>
      </form>
      <input
        type="file"
        id="image"
        name="image"
        onChange={(e) => {
          console.log("e.target.files", e.target.files);
          setSelectedImages(e.target.files[0]);
        }}
      />
      <button onClick={uploadImage}>Upload image</button>
      {/* </UserBox> */}
      <>
        <p>Title {addPost.title}</p>
        <p>Date {addPost.date}</p>
        <p>Content {addPost.content}</p>
        <p>Method {addPost.method}</p>

        {/* <Image
          cloudName="dcvh93esc"
          publicId={`https://res.cloudinary.com/dcvh93esc/image/upload/v1656537173/${addPost.image.public_id}`}
        /> */}
      </>
    </>
  );
};

export default CreatePost;
