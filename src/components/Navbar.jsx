import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AppBar,
  Avatar,
  Box,
  InputBase,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";
import { Notifications } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
//import DreamPost.png from "../assets/DreamPost.png";
import DreamPost from "../assets/DreamPost.png";

import { UserContext } from "../App";

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

const Search = styled("div")(({ theme }) => ({
  background: "white",
  padding: "0 10px",
  borderRadius: theme.shape.borderRadius,
  width: theme.shape.width,
}));

const StyledIcons = styled(Box)(({ theme }) => ({
  display: "none", //
  gap: "20px", // gap between icons
  alignItems: "center",
  [theme.breakpoints.up("sm")]: {
    display: "flex",
  },
}));

const StyledUserBox = styled(Box)(({ theme }) => ({
  display: "flex", // flex
  gap: "10px", // gap between icons
  alignItems: "center", // align icons vertically
  [theme.breakpoints.up("sm")]: {
    display: "none", // none
  },
}));

const Navbar = () => {
  const navigate = useNavigate();
  const { user, setUser } = React.useContext(UserContext);
  // console.log("user.username on navbar logged in----->", currentUser);
  // const isCurrentUser = currentUser.user.username === user.username;

  const [open, setOpen] = React.useState(false);
  return (
    <>
      <AppBar position="sticky" style={{ paddingTop: "9px" }}>
        {/* If there's no user.username logged in, display logo */}
        {!user.username ? (
          <img
            src={DreamPost}
            alt="DreamPost logo"
            style={{ height: "50px", width: "200px", margin: "0 auto" }}
          />
        ) : null}

        {/* If there's a user.username logged in, display all the tools on navbar */}
        {user.username ? (
          <StyledToolbar>
            {/* header*/}
            <Typography
              variant="h4"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              {user.username ? (
                <p>
                  <img
                    src={DreamPost}
                    alt="DreamPost logo"
                    style={{ height: "50px", width: "200px" }}
                  />
                </p>
              ) : (
                setUser("")
              )}
            </Typography>
            {/* Search and show Icon when screen is XS */}
            <MenuIcon
              sx={{ display: { xs: "block", sm: "none" }, fontSize: "50px" }}
            />
            {user.username ? (
              <Search>
                <InputBase placeholder="Search..." error={true} />
              </Search>
            ) : (
              setUser("")
            )}
            {/* Mail and notification icons + avatar - remove if display is mobile */}
            <StyledIcons>
              <Badge badgeContent={2} color="secondary">
                <MailIcon />
              </Badge>
              <Badge badgeContent={2} color="secondary">
                <Notifications />
              </Badge>

              <Avatar
                sx={{ height: 30, width: 30 }}
                alt="Github Avatar"
                src="https://avatars.githubusercontent.com/u/57161327?v=4"
                onClick={() => setOpen(!open)}
              />
            </StyledIcons>
            {/* User avatar and name for smaller screens - display if mobile */}
            <StyledUserBox onClick={() => setOpen(!open)}>
              <Avatar
                sx={{ height: 30, width: 30 }}
                alt="Github Avatar"
                src="https://avatars.githubusercontent.com/u/57161327?v=4"
              />
              <Typography variant="span">{user.username}</Typography>
              {/*Link to books */}
            </StyledUserBox>
          </StyledToolbar>
        ) : (
          setUser("")
        )}

        {/* Hidden Menu */}

        <Menu
          id="demo-positioned-menu"
          aria-labelledby="demo-positioned-button"
          open={open}
          onClose={() => setOpen(!open)}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <MenuItem>Profile</MenuItem>
          <MenuItem>My account</MenuItem>
          <MenuItem
            onClick={() => {
              window.localStorage.removeItem("auth-token");
              window.localStorage.removeItem("user");
              setUser("");
              navigate("/login");
              setOpen(!open);
            }}
          >
            Logout
          </MenuItem>

          <MenuItem>
            <Link to="/books">Books</Link>
          </MenuItem>
        </Menu>
      </AppBar>
    </>
  );
};

export default Navbar;
