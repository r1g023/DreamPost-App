import React, { useContext } from "react";
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
import { Link } from "react-router-dom";
import { UserContext } from "../App";

export default function TemporaryDrawer() {
  const [state, setState] = React.useState({
    left: false,
  });

  const { user } = React.useContext(UserContext);

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  // const list = (anchor) => (
  //   <Box
  //     sx={{
  //       width: anchor === "top" || anchor === "bottom" ? "auto" : 250,
  //       display: { xs: "block", sm: "none" },
  //     }}
  //     role="presentation"
  //     onClick={toggleDrawer(anchor, false)}
  //     onKeyDown={toggleDrawer(anchor, false)}
  //   >
  //     <Divider />

  //     <List sx={{ color: "white" }}>
  //       {["Home", "Profile", "DarkMode"].map((text, index) => (
  //         <ListItem key={text} disablePadding>
  //           <ListItemButton>
  //             <ListItemIcon>
  //               {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
  //             </ListItemIcon>
  //             <ListItemText primary={text} />
  //           </ListItemButton>
  //           <h1>TEST</h1>
  //         </ListItem>
  //       ))}
  //     </List>
  //   </Box>
  // );

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
            sx={{}}
          >
            <Box
              sx={{
                backgroundColor: "primary.main",
                height: "100%",
                color: "white",
              }}
            >
              {/* Lists of items */}
              <List sx={{ marginTop: "50%" }}>
                {/* Home page */}
                <ListItem disablePadding>
                  <ListItemButton component="a" href="/">
                    <ListItemIcon>
                      <HomeIcon color={user.dark_mode ? "whiteColor" : ""} />
                    </ListItemIcon>
                    <ListItemText primary="Homepage" />
                  </ListItemButton>
                </ListItem>

                {/* profile */}
                <Link
                  to="/profile"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <AccountBox
                          color={user.dark_mode ? "whiteColor" : ""}
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

                {/* ------------ Night Mode ------------- */}
                <ListItem disablePadding>
                  <ListItemButton component="a" href="#night-''">
                    <ListItemIcon>
                      <ModeNight color="magentaThemeColor" />
                    </ListItemIcon>
                    <Switch
                      color="magentaThemeColor"
                      checked={"" || false}
                      value={"" || ""}
                      // onChange={handleChange}
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
