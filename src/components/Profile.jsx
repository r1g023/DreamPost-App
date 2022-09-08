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
import dayjs from "dayjs";

import Stack from "@mui/material/Stack";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

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
  const [value, setValue] = React.useState(dayjs());

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
    id: user.id,
    first_name: user.first_name,
    last_name: user.last_name,
    dob: user.dob,
    role: user.role,
    avatar: user.avatar,
    about_you: user.about_you,
  });

  const [reload, setReload] = React.useState(false);

  React.useEffect(() => {
    console.log("data on Profile", data);
    localStorage.getItem("user");
    const editNameData = localStorage.getItem("editName");
    if (editNameData) {
      setEditName(JSON.parse(editNameData));
    }
  }, [data, user, reload, setUser]);

  // set localStorage to editName
  React.useEffect(() => {
    localStorage.setItem("editName", JSON.stringify(editName));
  }, [editName]);

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

  console.log("PROFILE did mount");
  return (
    <div style={{ backgroundColor: "#002A53", opacity: 0.9 }}>
      {console.log("PROFILE DID RENDER--->")}
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
              label="First Name"
              onChange={handleChange}
              value={editName.first_name || ""}
            />
            <TextField
              id="demo-helper-text-aligned"
              name="last_name"
              label="Last Name"
              onChange={handleChange}
              // get current user value on values
              value={editName.last_name || ""}
              sx={{ marginTop: "0.5rem" }}
            />
            {/* DOB */}
            {/* <TextField
              id="demo-helper-text-aligned"
              name="dob"
              onChange={handleChange}
              sx={{ marginTop: "0.5rem" }}
              value={editName.dob || ""}
            /> */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <MobileDatePicker
                label="dob"
                name="dob"
                value={editName.dob || ""}
                onChange={(newValue) => {
                  console.log("newValue", newValue);
                  setEditName({
                    ...editName,
                    dob: newValue,
                  });
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
            {/* form data for user role */}
            <FormControl fullWidth sx={{ marginTop: "10px" }}>
              <InputLabel id="demo-simple-select-helper-label">Role</InputLabel>
              <Select
                sx={{ color: "black" }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="role"
                label="Role"
                onChange={handleChange}
                value={editName.role || ""}
              >
                <MenuItem value="">
                  <em>Must Select One</em>
                </MenuItem>
                <MenuItem value={"admin"}>admin</MenuItem>
                <MenuItem value={"user"}>user</MenuItem>
              </Select>
            </FormControl>
            {/* about you */}
            <TextField
              id="standard-multiline-static"
              label="about_you"
              name="about_you"
              multiline
              rows={4}
              onChange={handleChange}
              sx={{ marginTop: "0.5rem" }}
              value={editName.about_you || ""}
              variant="standard"
              color="otherColor"
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
        <Link to="/profile"> Profile </Link>
        <h2>
          Books <Link to="/books">Bookss</Link>
        </h2>

        {user && editName && (
          <Box
            style={{
              color: "white",
              padding: "15px",

              width: "65%",
            }}
          >
            <h3 className="profile">
              First_Name:
              <span className="profile-info"> {editName.first_name}</span>
            </h3>
            <h3 className="profile">
              Last_Name:
              <span className="profile-info"> {editName.last_name}</span>
            </h3>
            <h3 className="profile">
              DOB: <span className="profile-info">{user.dob}</span>
            </h3>
            <h3 className="profile">
              Email: <span className="profile-info">{user.email}</span>
            </h3>
            <h3 className="profile">
              Username:
              <span className="profile-info"> {user.username}</span>
            </h3>
            <h3 className="profile">
              Role: <span className="profile-info">{editName.role}</span>
            </h3>
            <h3 className="profile">
              Dark_Mode:
              <span className="profile-info">
                {" "}
                {user.dark_mode ? "true" : "false"}
              </span>
            </h3>
            <h3 className="profile">
              About_You:
              <span className="profile-info"> {editName.about_you}</span>
            </h3>

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                marginTop: "1rem",
              }}
            >
              {user.avatar && (
                <img src={user.avatar} alt="avatar" height="100px" />
              )}
            </Box>
          </Box>
        )}
      </StyledBox>
    </div>
  );
};

export default Profile;
