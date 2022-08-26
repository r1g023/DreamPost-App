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
  InputLabel,
  Select,
  MenuItem,
  Box,
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

// container for profile page
const StyledBox = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  height: "100vh",
  gap: "1rem",
});

const Profile = () => {
  const { user, setUser } = useContext(UserContext);
  console.log("user on Profile****", user);
  const [selectedImages, setSelectedImages] = React.useState([]);
  const [uploadPhoto, setUploadPhoto] = React.useState(null);
  const [togglePhoto, setTogglePhoto] = React.useState(false);
  const navigate = useNavigate();

  const { error, data } = useQuery(GET_USER, {
    variables: { id: user.id },
  });
  const [updateUser] = useMutation(UPDATE_USER);

  // form for updating user profile
  const [updateUserID, setUpdateUserID] = React.useState({
    id: "",
    first_name: "",
    last_name: "",
    dob: "",
    role: "",
    avatar: "",
    about_you: "",
  });

  const [editName, setEditName] = React.useState({
    id: "",
    first_name: user.first_name,
    last_name: user.last_name,
    dob: user.dob,
    role: "",
    avatar: user.avatar,
    about_you: user.about_you,
  });

  React.useEffect(() => {
    console.log("data on Profile", data);
    localStorage.getItem("user");
  }, [
    data,
    user,
    user.first_name,
    user.last_name,
    user.dob,
    user.role,
    user.about_you,
    editName,
  ]);

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
  // const handleChanges = (e) => {
  //   // handle changes for updateUserID and also include the current user
  //   setUpdateUserID({
  //     ...updateUserID,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  // handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("updateUserID Submit", updateUserID);
    console.log("editName Submit", editName);
    updateUser({
      variables: {
        id: user.id,
        first_name: editName.first_name,
        last_name: editName.last_name,
        dob: editName.dob,

        role: editName.role,

        about_you: editName.about_you,
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
    setEditName({
      ...editName,
      id: "",
      first_name: user.first_name,
      last_name: user.last_name,
      dob: user.dob,
      role: "",
      avatar: user.avatar,
      about_you: user.about_you,
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

  const handleChange = (e) => {
    console.log("E TARGET", e.target.name, e.target.value);
    setEditName({
      ...editName,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div style={{ backgroundColor: "#002A53", opacity: 0.9 }}>
      {/* form to update user */}
      <StyledBox>
        <h1 style={{ color: "white" }}>Profile Settings</h1>
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

        <Typography
          variant="h6"
          sx={{
            display: "block",
            border: "1px solid green",
            textAlign: "center",
          }}
        >
          <span style={{ color: "green" }}>@{user.username}</span>
        </Typography>
        <form
          style={{
            background: "white",
            padding: "3rem",
            borderRadius: "0.7rem",
            gap: "1rem",
            display: "flex",
            flexDirection: "column",
            width: "55%",
          }}
        >
          <>
            <TextField
              id="demo-helper-text-aligned"
              name="first_name"
              onChange={handleChange}
              //get value from editName or select value from user but enable user to change it
              value={user.first_name && editName.first_name}
            />
            <TextField
              id="demo-helper-text-aligned"
              name="last_name"
              onChange={handleChange}
              // get current user value on values
              value={editName.last_name}
              sx={{ marginTop: "0.5rem" }}
            />
            <TextField
              id="demo-helper-text-aligned"
              label="dob"
              name="dob"
              onChange={handleChange}
              sx={{ marginTop: "0.5rem" }}
              value={editName.dob}
            />
            {/* form data for user role */}
            <FormControl fullWidth sx={{ marginTop: "10px" }}>
              <InputLabel id="demo-simple-select-helper-label">Role</InputLabel>
              <Select
                sx={{ color: "black" }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="role"
                onChange={handleChange}
                value={editName.role}
              >
                <MenuItem value="">
                  <em>Must Select One</em>
                </MenuItem>
                <MenuItem value={"admin"}>admin</MenuItem>
                <MenuItem value={"user"}>user</MenuItem>
              </Select>
            </FormControl>
            <TextField
              id="demo-helper-text-aligned"
              label="about_you"
              name="about_you"
              onChange={handleChange}
              sx={{ marginTop: "0.5rem" }}
              value={editName.about_you}
            />
            <Button
              variant="contained"
              color="success"
              type="submit"
              onClick={handleSubmit}
            >
              Update Profile
            </Button>{" "}
          </>
        </form>
        <p>Name: {updateUserID.first_name}</p>

        <h2>
          Books{" "}
          <Link to="/books" reloadDocument={user.role === "admin" ? true : ""}>
            Books
          </Link>
        </h2>

        {user && (
          <div style={{ color: "white" }}>
            <h2>First_Name: {user.first_name}</h2>
            <h2>Last_Name: {user.last_name}</h2>
            <h2>DOB: {user.dob}</h2>
            <h2>Email: {user.email}</h2>
            <h2>Username: {user.username}</h2>
            <h2>Role: {user.role}</h2>
            <h2>Dark_Mode: {user.dark_mode ? "true" : "false"}</h2>
            <h2>About_You: {user.about_you}</h2>
            Avatar{" "}
            {user.avatar && (
              <img src={uploadPhoto} alt="avatar" height="100px" />
            )}
          </div>
        )}
      </StyledBox>
    </div>
  );
};

export default Profile;
