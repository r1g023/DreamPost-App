import React from "react";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Switch,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { AccountBox, ModeNight, Person } from "@mui/icons-material";
import { gql, useMutation } from "@apollo/client";
import { Link, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { toast } from "react-toastify";

const DARK_MODE = gql`
  mutation updateUserID($id: Int!, $dark_mode: Boolean) {
    updateUser(id: $id, dark_mode: $dark_mode) {
      id
      username
      first_name
      last_name
      role
      email
      token
      dob
      avatar
      dark_mode
      about_you
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

const Sidebar = ({ mode, setMode, user, setUser }) => {
  const [updateUser, { data, error }] = useMutation(DARK_MODE);
  const navigate = useNavigate();

  React.useEffect(() => {
    let userDarkMode = localStorage.getItem("user.dark_mode");
    if (userDarkMode) {
      setMode(userDarkMode);
    }
  }, [user.dark_mode, setMode]);

  // toggle handle user on checkbox input
  const handleChange = (e) => {
    const token = window.localStorage.getItem("auth-token");

    if (!token || (token && jwt_decode(token).exp * 1000 < Date.now())) {
      toast.error("Your session has expired. Please login again.", {
        autoClose: 5000,
        onClose: () => {
          setUser("");
        },
      });
    } else {
      let result = updateUser({
        variables: {
          id: user.id,
          dark_mode: e.target.checked,
        },
      }).then((res) => {
        setMode(res.data.updateUser.dark_mode);
        setUser({
          ...user,
          dark_mode: localStorage.setItem(
            "user",
            JSON.stringify(res.data.updateUser)
          ),
        });
      });

      return result;
    }
  };

  return (
    <>
      <Box
        flex={2}
        p={2}
        sx={{
          display: {
            xs: "none",
            sm: "block",
          },
        }}>
        <Box sx={{ position: "fixed" }}>
          {/* Lists of items */}
          <List>
            {/* Home page */}
            <ListItem
              disablePadding
              onClick={() => {
                // navigate to home page and refresh
                navigate("/");
                window.location.reload();
              }}>
              <ListItemButton
                component="a"
                onClick={() => {
                  navigate("/");
                  window.location.reload();
                }}>
                <ListItemIcon>
                  <HomeIcon color={mode ? "whiteColor" : "otherColor"} />
                </ListItemIcon>
                <ListItemText primary="Homepage" />
              </ListItemButton>
            </ListItem>

            {/* profile */}
            <Link
              to="/profile"
              style={{
                textDecoration: "none",
                color: mode ? "white" : "black",
              }}>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <AccountBox color={mode ? "whiteColor" : "otherColor"} />
                  </ListItemIcon>
                  <ListItemText primary="Profile" />
                </ListItemButton>
              </ListItem>
            </Link>

            {/* Books */}
            <Link
              to="/books"
              style={{
                textDecoration: "none",
                color: mode ? "white" : "black",
              }}>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <Person color={mode ? "whiteColor" : "otherColor"} />
                  </ListItemIcon>
                  <ListItemText primary="Books" />
                </ListItemButton>
              </ListItem>
            </Link>

            {/* ------------ Night Mode ------------- */}
            <ListItem disablePadding>
              <ListItemButton component="a" href="#night-mode">
                <ListItemIcon>
                  <ModeNight
                    color={mode ? "otherColor" : "magentaThemeColor"}
                  />
                </ListItemIcon>
                <Switch
                  color="magentaThemeColor"
                  checked={mode || false}
                  value={mode || ""}
                  onChange={handleChange}
                />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Box>
    </>
  );
};

export default Sidebar;
