import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import { AccountBox, ModeNight } from "@mui/icons-material";
import { Switch } from "@mui/material";

import { UserContext } from "../App";
import { gql, useQuery, useMutation } from "@apollo/client";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";

//add toggle DARK_MODE to user.dark_mode option
const DARK_MODE = gql`
  mutation updateUserID($id: Int!, $dark_mode: Boolean) {
    updateUser(id: $id, dark_mode: $dark_mode) {
      id
      username
      first_name
      last_name
      email
      role
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

export default function TemporaryDrawer() {
  const [state, setState] = React.useState({
    left: false,
  });

  const navigate = useNavigate();

  const { user, setUser, mode } = React.useContext(UserContext);
  const [updateUser, { data, error }] = useMutation(DARK_MODE);

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  // toggle handle user on checkbox input
  const handleChange = (e) => {
    let result = updateUser({
      variables: {
        id: user.id,
        dark_mode: e.target.checked,
      },
    }).then((res) => {
      // console.log("result", res);
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
    <div>
      {["left"].map((anchor) => (
        <React.Fragment key={anchor}>
          {/* hamburger menu icon  */}
          <MenuIcon
            onClick={toggleDrawer(anchor, true)}
            sx={{
              display: { xs: "block", sm: "none" },
              fontSize: "50px",
              cursor: "pointer",
            }}
          />

          {/* container for my side drawer with homepage, profile and dark_mode */}
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            sx={{}}>
            <Box
              sx={{
                backgroundColor: "primary.main",
                height: "100%",
                color: "white",
              }}>
              {/* Lists of items */}
              <List sx={{ marginTop: "50%" }}>
                {/* Home page */}
                <ListItem disablePadding>
                  <ListItemButton
                    component="a"
                    onClick={() => {
                      window.location.reload();
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
                  style={{ textDecoration: "none", color: "white" }}>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <AccountBox
                          color={mode ? "whiteColor" : "otherColor"}
                        />
                      </ListItemIcon>
                      <ListItemText primary="Profile" />
                    </ListItemButton>
                  </ListItem>
                </Link>
                {/* <Divider
                  sx={{
                    boxShadow: "0px 10px 5px white",
                    width: "100%",
                  }}
                /> */}

                {/* Books */}
                <Link
                  to="/books"
                  style={{ textDecoration: "none", color: "white" }}>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        {/* book icon */}
                        <AutoStoriesIcon
                          color={mode ? "whiteColor" : "otherColor"}
                        />
                      </ListItemIcon>
                      <ListItemText primary="Books" />
                    </ListItemButton>
                  </ListItem>
                </Link>

                {/* ------------ Night Mode ------------- */}
                <ListItem disablePadding>
                  <ListItemButton component="a" href="#night-''">
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
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
