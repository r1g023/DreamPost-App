import React, { useContext } from "react";
import { useMutation, useQuery, gql } from "@apollo/client";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";
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

import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import moment from "moment";
import ProfileModal from "../pages/ProfileModal";
import jwt_decode from "jwt-decode";
import { toast, ToastContainer } from "react-toastify";

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
  active: {
    display: "none",
  },
});

// container reponsive for profile page
const StyledBox = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  gap: "1rem",

  height: "100vh",
});

const Profile = () => {
  const { user, setUser, mode } = useContext(UserContext);
  // console.log("user on Profile****", user);
  const [selectedImages, setSelectedImages] = React.useState([]);
  const [uploadPhoto, setUploadPhoto] = React.useState(null);
  const [toggleModal, setToggleModal] = React.useState(false);

  function toggleModalUpload() {
    setToggleModal(!toggleModal);
    setUploadPhoto(null);
  }

  const { data } = useQuery(GET_USER, {
    variables: { id: user.id },
  });
  const [updateUser] = useMutation(UPDATE_USER);

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
    // console.log("data on Profile", data);
    localStorage.getItem("user");
    const editNameData = localStorage.getItem("editName");
    if (editNameData) {
      setEditName(JSON.parse(editNameData));
    }
  }, [data, user, reload, setUser]);

  let dateToFormat = "2018-05-16 12:57:13"; //TIMESTAMP
  moment(dateToFormat).format("DD/MM/YYYY"); // you get "16/05/2018"

  // set localStorage to editName
  React.useEffect(() => {
    localStorage.setItem("editName", JSON.stringify(editName));
  }, [editName, user.id]);

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

        setUploadPhoto(response.data.secure_url);
      } catch {
        // console.log("error uploading image");
      }
    };
    postImage();
  }

  // handle form submission .
  const handleSubmit = (e) => {
    e.preventDefault();
    const token = window.localStorage.getItem("auth-token");

    if (!token || (token && jwt_decode(token).exp * 1000 < Date.now())) {
      toast.error("Your session has expired. Please login again.", {
        autoClose: 5000,

        onClose: () => {
          setUser("");
        },
      });
    } else {
      updateUser({
        variables: {
          id: user.id,
          first_name: editName.first_name,
          last_name: editName.last_name,
          dob: editName.dob,
          role: editName.role,
          about_you: editName.about_you,
        },
      }).then((res) => {
        setUser({
          ...user,
          first_name: localStorage.setItem(
            "user",
            JSON.stringify(res.data.updateUser)
          ),
        });
        setReload(!reload);
        window.location.reload();
      });
      // console.log("updateUserError", updateUserError);
    }
  };

  // handle PHOTO form submission
  function handlePhotoSubmit() {
    const token = window.localStorage.getItem("auth-token");

    if (!token || (token && jwt_decode(token).exp * 1000 < Date.now())) {
      toast.error("Your session has expired. Please login again.", {
        autoClose: 5000,
        onClose: () => {
          setUser("");
        },
      });
    } else {
      updateUser({
        variables: {
          id: user.id,
          avatar: uploadPhoto,
        },
      }).then((res) => {
        setUser({
          ...user,
          avatar: localStorage.setItem(
            "user",
            JSON.stringify(res.data.updateUser)
          ),
        });
        setReload(!reload);
        window.location.reload();
      });
      // console.log("updateUserError", updateUserError);
    }
  }

  const handleChange = (e) => {
    // console.log("E TARGET", e.target.name, e.target.value);
    setEditName({
      ...editName,
      [e.target.name]: e.target.value,
    });
  };

  // console.log("PROFILE did mount");
  return (
    <div
      className="profile-container responsive"
      id="profile-responsive"
      style={{
        backgroundColor: mode ? "#002A53" : "#E1D9D1",
        opacity: 0.9,
        // marginTop: "73px",
        // border: "3px solid red",
        // padding: "50px 0 50px",
      }}>
      {/* {console.log("PROFILE DID RENDER--->")} */}
      {/* form to update user */}
      <StyledBox>
        <h1 style={{ color: mode ? "white" : "black", paddingTop: "40px" }}>
          Profile Settings
        </h1>

        <Button
          onClick={(prev) => setToggleModal(!toggleModal)}
          variant="outlined"
          color="otherColor">
          Change Avatar
        </Button>

        {/* Profile Modal opens up if toggleModal is true */}
        {toggleModal ? (
          <ProfileModal onCancel={toggleModalUpload}>
            <label
              htmlFor="icon-button-file"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}>
              <label
                htmlFor="image"
                style={{
                  display: "block",
                  color: mode ? "white" : "white",
                  textAlign: "center",
                  fontSize: "1rem",
                }}>
                Click avatar to select new image and click upload button
              </label>
              <Typography
                variant="h6"
                sx={{
                  display: "block",

                  textAlign: "center",
                }}>
                <span style={{ color: "green" }}>@{user.username}</span>
              </Typography>
              {/* Current Avatar Icon */}
              <Input
                accept="image/*"
                id="icon-button-file"
                type="file"
                name="avatar"
                onChange={(e) => {
                  // console.log("e.target.files", e.target.files);
                  setSelectedImages(e.target.files[0]);
                }}
              />
              {/*upload to cloud icon */}
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="span">
                <Avatar
                  src={user.avatar}
                  // src="https://i.pravatar.cc/300"
                />
              </IconButton>

              {/* only need to show this if a photo is uploaded */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}>
                {uploadPhoto && (
                  <Image
                    cloudName="dcvh93esc"
                    publicId={`${uploadPhoto}`}
                    height="120px"
                    width="120px"
                  />
                )}
                {/* button to upload image to Cloud */}
              </div>
            </label>

            <div
              className="uploadPhoto"
              style={{
                textAlign: "center",

                display: "flex",
                flexDirection: "column",
              }}>
              {!uploadPhoto && (
                <CloudUploadIcon
                  color="otherColor"
                  sx={{
                    fontSize: 50,
                    cursor: "pointer",
                    margin: "0 auto",
                    paddingTop: "50px",
                  }}
                  onClick={() => {
                    uploadImage();
                  }}
                />
              )}
              {uploadPhoto && (
                <Button
                  onClick={handlePhotoSubmit}
                  variant="contained"
                  color="success"
                  sx={{ marginTop: 5 }}>
                  Upload Photo
                </Button>
              )}
            </div>
          </ProfileModal>
        ) : null}

        {/* this shows the current avatar and username*/}
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="span">
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
            textAlign: "center",
          }}>
          <span style={{ color: "green" }}>@{user.username}</span>
        </Typography>
        {/* ----------------------------------------------------------------------------------------------------------------FORM STARTS HERE--------------------------------------------------------*/}
        <form
          style={{
            background: "white",
            padding: "3rem",
            borderRadius: "0.7rem",
            gap: "1rem",
            display: "flex",
            flexDirection: "column",
            width: "55%",
          }}>
          <>
            {/* first_name */}
            <TextField
              id="demo-helper-text-aligned"
              name="first_name"
              label="First Name"
              onChange={handleChange}
              value={editName.first_name || ""}
            />
            {/* last name */}
            <TextField
              id="demo-helper-text-aligned"
              name="last_name"
              label="Last Name"
              onChange={handleChange}
              // get current user value on values
              value={editName.last_name || ""}
              sx={{ marginTop: "0.5rem" }}
            />
            {/*DOB*/}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <MobileDatePicker
                label="Date Of Birth"
                name="dob"
                value={editName.dob}
                onChange={(newValue) => {
                  // console.log("newValue", newValue);
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
                value={editName.role || ""}>
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
              onClick={handleSubmit}>
              Update Profile
            </Button>{" "}
          </>
        </form>
        {}

        <Box
          style={{
            padding: "15px",
            color: mode ? "white" : "black",
            width: "65%",
            background: mode ? "" : "white",
            borderRadius: "0.7rem",
          }}>
          <h3 className="profile">
            First_Name:
            <span className="profile-info"> {editName.first_name}</span>
          </h3>
          <h3 className="profile">
            Last_Name:
            <span className="profile-info"> {editName.last_name}</span>
          </h3>
          <h3 className="profile">
            DOB:{" "}
            <span className="profile-info">
              {moment(user.dob).format("MM/DD/YYYY")}
            </span>
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
            }}>
            <p>Full Avatar</p>
          </Box>
          <div style={{ textAlign: "center", marginTop: "10px" }}>
            {user.avatar && (
              <img src={user.avatar} alt="avatar" height="100px" />
            )}
          </div>
        </Box>
      </StyledBox>
    </div>
  );
};

export default Profile;
