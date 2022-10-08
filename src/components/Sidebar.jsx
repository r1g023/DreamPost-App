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
import { AccountBox, ModeNight, Person, Settings } from "@mui/icons-material";
import { gql, useQuery, useMutation } from "@apollo/client";
import { Link, useNavigate } from "react-router-dom";

//add toggle DARK_MODE to user.dark_mode option
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
  // const { user, setUser } = React.useContext(UserContext);
  const [updateUser, { data, error }] = useMutation(DARK_MODE);
  // const [mode, setMode] = React.useState(user.dark_mode);

  React.useEffect(() => {
    // setMode(!mode);

    // setMode(user.dark_mode);
    // get dark_mode from user.dark_mode on localStorage
    // if (localStorage.getItem("dark_mode")) {
    let userDarkMode = localStorage.getItem("user.dark_mode");
    if (userDarkMode) {
      setMode(userDarkMode);
    }
  }, [user.dark_mode, setMode]);

  // toggle handle user on checkbox input
  const handleChange = (e) => {
    let result = updateUser({
      variables: {
        id: user.id,
        dark_mode: e.target.checked,
      },
    }).then((res) => {
      console.log("result", res);
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
        }}
      >
        <Box sx={{ position: "fixed" }}>
          {/* Lists of items */}
          <List>
            {/* Home page */}
            <ListItem disablePadding>
              <ListItemButton component="a" href="/">
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
              }}
            >
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <AccountBox color={mode ? "whiteColor" : "otherColor"} />
                  </ListItemIcon>
                  <ListItemText primary="Profile" />
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
