import React, { useContext } from "react";
import { useMutation, useQuery, gql } from "@apollo/client";
import { UserContext } from "../App";
import { Link, useNavigate } from "react-router-dom";
import { Image } from "cloudinary-react";
import axios from "axios";
import {
  Avatar,
  Button,
  FormControl,
  IconButton,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const GET_USER = gql`
  query getUserById($id: Int!) {
    getUserById(id: $id) {
      id
      first_name
      last_name
      dob
      email
      username
      role
      avatar
      dark_mode
      about_you
      created_at
      updated_at
    }
  }
`;

const UPDATE_USER = gql`
  mutation updateUser(
    $id: Int!
    $first_name: String
    $last_name: String
    $dob: String
    $email: String
    $role: String
    $avatar: String
    $about_you: String
  ) {
    updateUser(
      id: $id
      first_name: $first_name
      last_name: $last_name
      dob: $dob
      email: $email
      role: $role
      avatar: $avatar
      about_you: $about_you
    ) {
      id
      username
      first_name
      last_name
      email
      token
      dob
      avatar
      dark_mode
      about_you
      role
      created_at
      updated_at
      posts {
        id
        title
        date
        image
        post
        liked
        user_id
        created_at
        updated_at
        comments {
          id
          comment
          liked
          post_id
          created_at
          updated_at
        }
      }
      comments {
        id
        comment
        liked
        count
        user
        post_id
      }
    }
  }
`;

// Remove image upload button from the form
const Input = styled("input")({
  display: "none",
});

const Profile = () => {
  const { user, setUser } = useContext(UserContext);
  console.log("user on Profile****", user);
  const [selectedImages, setSelectedImages] = React.useState([]);
  const [uploadPhoto, setUploadPhoto] = React.useState(null);
  const [togglePhoto, setTogglePhoto] = React.useState(false);
  const navigate = useNavigate();
  // form for updating user profile
  const [updateUserID, setUpdateUserID] = React.useState({
    id: "",
    first_name: "",
    last_name: "",
    dob: null,

    role: "",
    avatar: "",
    about_you: "",
  });
  const { error, data } = useQuery(GET_USER, {
    variables: { id: user.id },
  });
  const [updateUser] = useMutation(UPDATE_USER);

  React.useEffect(() => {
    console.log("data on Profile", data);
    localStorage.getItem("user");
  }, [data, user]);

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

  // handle changes to the form
  const handleChanges = (e) => {
    setUpdateUserID({ ...updateUserID, [e.target.name]: e.target.value });
  };

  // handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("updateUserID", updateUserID);
    updateUser({
      variables: {
        id: user.id,
        first_name: updateUserID.first_name,
        last_name: updateUserID.last_name,
        dob: updateUserID.dob,

        role: updateUserID.role,

        about_you: updateUserID.about_you,
      },
    })
      // add it to set user on local storage
      .then((res) => {
        console.log("res on Profile", res);
        // setUser(res.data.updateUser);
        setUser({
          ...user,
          role: localStorage.setItem(
            "user",
            JSON.stringify(res.data.updateUser)
          ),
        });
        setUploadPhoto(null);
        window.location.reload();
      });
  };

  // handle PHOTO form submission
  function handlePhotoSubmit() {
    console.log("updateUserID", updateUserID);
    updateUser({
      variables: {
        id: user.id,
        avatar: uploadPhoto,
      },
    })
      // add it to set user on local storage
      .then((res) => {
        console.log("res on Profile", res);
        // setUser(res.data.updateUser);
        setUser({
          ...user,
          avatar: localStorage.setItem(
            "user",
            JSON.stringify(res.data.updateUser)
          ),
        });

        setUploadPhoto(null);
        window.location.reload();
      });
  }

  return (
    <div
      style={{ margin: "0 auto", border: "1px solid red", textAlign: "center" }}
    >
      {/* form to update user */}

      <h1>Profile Settings</h1>

      <FormControl
        style={{
          background: "white",
          padding: "1rem",
          borderRadius: "0.7rem",
          gap: "0.2rem",
          border: "1px solid #e0e0e0",
        }}
      >
        <>
          <label htmlFor="icon-button-file">
            <label htmlFor="image" style={{ display: "block" }}>
              Click profile image to select new image
              <br /> and then click cloud upload
            </label>
            <Typography variant="h6">
              <span style={{ color: "green" }}>@{user.username}</span>
            </Typography>
            {/*camera Icon */}
            <Input
              accept="image/*"
              id="icon-button-file"
              type="file"
              sx={{ color: "red" }}
              name="avatar"
              onChange={(e) => {
                console.log("e.target.files", e.target.files);
                setSelectedImages(e.target.files[0]);
                uploadImage(e);
              }}
            />
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
            >
              <Avatar
                src={user.avatar}
                // src="https://i.pravatar.cc/300"
                sx={{ border: "1px solid red", margin: "0 auto" }}
              />
            </IconButton>
          </label>
          {uploadPhoto && (
            <Image
              cloudName="dcvh93esc"
              publicId={`${uploadPhoto}`}
              height="120px"
              width="120px"
              margin="0 auto"
              display="block"
            />
          )}
          {/* button to upload image to Cloud */}
          <CloudUploadIcon
            color="otherColor"
            sx={{ fontSize: 50, cursor: "pointer" }}
            onClick={() => {
              uploadImage();
            }}
          />
          <button onClick={() => handlePhotoSubmit()}>SUBMIT PHOTO</button>
          {/* button to upload image to Cloud */}
          {/* <Button
            variant="contained"
            component="label"
            color="success"
            onClick={() => {
              uploadImage();
              // setTimeout(() => {
              //   handlePhotoSubmit();
              // }, 2000);
            }}
          >
            Upload Photo
          </Button> */}
          <p style={{ color: "gray" }}>
            Click upload image to upload new Photo after selecting one!
          </p>
          <TextField
            id="demo-helper-text-aligned"
            label="first_name"
            name="first_name"
            onChange={handleChanges}
          />
          <TextField
            id="demo-helper-text-aligned"
            label="last_name"
            name="last_name"
            onChange={handleChanges}
            sx={{ marginTop: "0.5rem" }}
          />
          <TextField
            id="demo-helper-text-aligned"
            label="dob"
            name="dob"
            onChange={handleChanges}
            sx={{ marginTop: "0.5rem" }}
          />
          <TextField
            id="demo-helper-text-aligned"
            label="role"
            name="role"
            onChange={handleChanges}
            sx={{ marginTop: "0.5rem" }}
          />
          <TextField
            id="demo-helper-text-aligned"
            label="about_you"
            name="about_you"
            onChange={handleChanges}
            sx={{ marginTop: "0.5rem" }}
          />
          <Button
            variant="contained"
            color="success"
            type="submit"
            onClick={handleSubmit}
          >
            Add Post
          </Button>{" "}
          {/* <h2>Photo upload is required</h2> */}
          <span style={{ fontSize: "12px" }}>
            Don't forget to upload a photo
          </span>
        </>
      </FormControl>

      <h2>
        Books{" "}
        <Link to="/books" reloadDocument={user.role === "admin" ? true : ""}>
          Books
        </Link>
      </h2>

      {user && (
        <div>
          <h2>First_Name: {user.first_name}</h2>
          <h2>Last_Name: {user.last_name}</h2>
          <h2>DOB: {user.dob}</h2>
          <h2>Email: {user.email}</h2>
          <h2>Username: {user.username}</h2>
          <h2>Role: {user.role}</h2>
          <h2>Dark_Mode: {user.dark_mode ? "true" : "false"}</h2>
          <h2>About_You: {user.about_you}</h2>
          Avatar{" "}
          {user.avatar && <img src={uploadPhoto} alt="avatar" height="100px" />}
        </div>
      )}
    </div>
  );
};

export default Profile;
