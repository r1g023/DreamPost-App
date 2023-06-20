import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AppBar,
  Avatar,
  Box,
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
import DreamPost from "../assets/DreamPost.png";
import TemporaryDrawer from "../pages/TemporaryDrawer";
import { UserContext } from "../App";

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

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

const Navbar = ({ setUser }) => {
  const navigate = useNavigate();
  const { user } = React.useContext(UserContext);
  const [open, setOpen] = React.useState(false);
  // console.log("user.username on navbar logged in----->", currentUser);
  // const isCurrentUser = currentUser.user.username === user.username;
  React.useEffect(() => {
    // keep user logged in
  }, [user, user.username, user.role, user.avatar]);

  return (
    <>
      <AppBar
        position="fixed"
        style={{
          paddingTop: "9px",
          zIndex: "10",
        }}>
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
              sx={{ display: { xs: "none", sm: "block" } }}>
              {user.username ? (
                <p>
                  <img
                    onClick={() => {
                      navigate("/");
                      window.location.reload(false);
                    }}
                    src={DreamPost}
                    alt="DreamPost logo"
                    style={{
                      height: "50px",
                      width: "200px",
                      cursor: "pointer",
                    }}
                  />
                </p>
              ) : (
                setUser("")
              )}
            </Typography>
            {/*----------------------------------------------------------------------------------------------------------------*/}
            {/* Search and show Icon when screen is XS */}
            <TemporaryDrawer />
            {/* <MenuIcon
              onClick={() => {
                console.log("clicked");
              }}
              sx={{ display: { xs: "block", sm: "none" }, fontSize: "50px" }}
            /> */}

            {/* Mail and notification icons + avatar - remove if display is mobile */}
            <StyledIcons>
              <Badge
                badgeContent={1}
                color="secondary"
                sx={{ cursor: "pointer" }}>
                <MailIcon />
              </Badge>
              <Badge
                badgeContent={8}
                color="secondary"
                sx={{ cursor: "pointer" }}>
                {" "}
                <Notifications />
              </Badge>

              <Avatar
                sx={{ height: 30, width: 30 }}
                alt="Github Avatar"
                src={user.avatar}
                onClick={() => setOpen(!open)}
              />
            </StyledIcons>

            {/* User avatar and name for smaller screens - display if mobile */}
            <StyledUserBox onClick={() => setOpen(!open)}>
              <Avatar
                sx={{ height: 30, width: 30, cursor: "pointer" }}
                alt="profile photo"
                // show first letter of username if no avatar
                src={user.avatar ? user.avatar : ""}
              />
              <Typography
                variant="span"
                sx={{ marginRight: "5px", cursor: "pointer" }}>
                {user.username}
              </Typography>
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
          }}>
          {/* Profile page */}
          <MenuItem>
            <Link
              to="/profile"
              style={{ textDecoration: "none", color: "black" }}>
              Profile
            </Link>
          </MenuItem>

          {/* Home page with force reload */}
          <MenuItem>
            <Link
              to="/"
              style={{ textDecoration: "none", color: "black" }}
              onClick={() => {
                navigate("/");
                window.location.reload(false);
              }}>
              Home
            </Link>
          </MenuItem>

          {/*Book page */}
          <MenuItem>
            <Link
              to="/books"
              style={{ textDecoration: "none", color: "black" }}
              // reloads the page when you click on the link
              // reloadDocument={user.role === "admin" ? true : false}
            >
              Books
            </Link>
          </MenuItem>

          {/* Logout */}
          <MenuItem
            onClick={() => {
              window.localStorage.removeItem("auth-token");
              window.localStorage.removeItem("user");
              window.localStorage.removeItem("editName");
              // remove localstore ab.storage.device and ab.storage.server
              window.localStorage.removeItem("ab.storage");
              // remove setValue and Value localstorage
              window.localStorage.removeItem("value");

              navigate("/login");
              // remove user upon logout
              setUser("");
            }}>
            Logout
          </MenuItem>
        </Menu>
      </AppBar>
    </>
  );
};

export default Navbar;
