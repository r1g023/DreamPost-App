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
import { UserContext } from "../App";
import "./post.css";
//add toggle DARK_MODE to user.dark_mode option
const DARK_MODE = gql`
  mutation updateUserID($id: Int!, $dark_mode: Boolean) {
    updateUser(id: $id, dark_mode: $dark_mode) {
      id
      dark_mode
    }
  }
`;

const Sidebar = () => {
  const { user, setUser } = React.useContext(UserContext);
  const [updateUser] = useMutation(DARK_MODE);

  console.log("user sidebar logged in*********----->", user);
  console.log("userID and dark_mode Sidebar########", user.id, user.dark_mode);
  const [mode, setMode] = React.useState();
  console.log("mode", mode);
  React.useEffect(() => {
    // setMode(!mode);
  }, []);

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
    });
    console.log("result outer--->", result);
    return result;
  };

  return (
    <>
      <p className={mode ? "sidebar" : ""}>Hello</p>
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
            {/* <input type="checkbox" onChange={handleChange} /> */}
            {/* <button onClick={handleChange}>Dark Mode test</button> */}
            <input
              type="checkbox"
              name="mode"
              checked={mode || ""}
              onChange={handleChange}
            />
            <p className={mode ? "sidebar" : ""}>{mode ? "true" : "false"}</p>

            {/* Home page */}
            {/* <ListItem disablePadding>
            <ListItemButton component="a" href="#home">
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Homepage" />
            </ListItemButton>
          </ListItem> */}

            {/* Friends */}
            {/* <ListItem disablePadding>
            <ListItemButton component="a" href="#friends">
              <ListItemIcon>
                <Person />
              </ListItemIcon>
              <ListItemText primary="Friends" />
            </ListItemButton>
          </ListItem> */}

            {/* Settings */}
            {/* <ListItem disablePadding>
            <ListItemButton component="a" href="#settings">
              <ListItemIcon>
                <Settings />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItemButton>
          </ListItem> */}

            {/* profile */}
            {/* <ListItem disablePadding>
            <ListItemButton component="a" href="#profile">
              <ListItemIcon>
                <AccountBox />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItemButton>
          </ListItem> */}

            {/* ------------ Night Mode ------------- */}
            {/* <ListItem disablePadding>
            <ListItemButton component="a" href="#night-mode">
              <ListItemIcon>
                <ModeNight />
              </ListItemIcon>
              <Switch
                onChange={() => setMode(!mode)}
              />
            </ListItemButton>
          </ListItem> */}
          </List>
        </Box>
      </Box>
    </>
  );
};

export default Sidebar;
