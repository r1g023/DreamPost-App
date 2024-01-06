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
  const [logout, setLogout] = React.useState(false);

  // this is for the hidden menu
  const [anchorEl, setAnchorEl] = React.useState(null);
  const opens = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  React.useEffect(() => {
    if (user === "") {
      setLogout(true);
    }
  }, [user]);

  const handleLogout = () => {
    window.localStorage.removeItem("auth-token");
    window.localStorage.removeItem("user");
    window.localStorage.removeItem("editName");
    window.localStorage.removeItem("ab.storage");
    window.localStorage.removeItem("value");
    setUser("");
    handleClose();
    navigate("/login");
  };

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
        {user && (
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
              ) : null}
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

              {/* reminder this is linked with the Hidden Menu, which prevents the anchorEl error on Avatar for all screen sizes */}
              <Avatar
                sx={{ height: 30, width: 30 }}
                alt="Github Avatar"
                src={user.avatar}
                id="basic-button"
                aria-controls={opens ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={opens ? "true" : undefined}
                onClick={handleClick}
              />
            </StyledIcons>

            {/* User avatar and name for smaller screens - display if mobile */}
            <StyledUserBox onClick={() => setOpen(!open)}>
              <Avatar
                sx={{ height: 30, width: 30, cursor: "pointer" }}
                alt="profile photo"
                src={user.avatar ? user.avatar : ""}
                id="basic-button"
                aria-controls={opens ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={opens ? "true" : undefined}
                onClick={handleClick}
              />
              <Typography
                variant="span"
                sx={{ marginRight: "5px", cursor: "pointer" }}>
                {user.username}
              </Typography>
              {/*Link to books */}
            </StyledUserBox>
          </StyledToolbar>
        )}

        {/* Hidden Menu */}
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={opens}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}>
          {/* Profile page */}
          <MenuItem onClick={handleClose}>
            <Link
              to="/profile"
              style={{ textDecoration: "none", color: "black" }}>
              Profile
            </Link>
          </MenuItem>

          {/* Home page with force reload */}
          <MenuItem onClick={handleClose}>
            <Link
              to="/"
              style={{ textDecoration: "none", color: "black" }}
              onClick={() => {
                window.location.reload();
                navigate("/");
                window.location.reload();
              }}>
              Home
            </Link>
          </MenuItem>

          {/*Book page */}
          <MenuItem onClick={handleClose}>
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
          <MenuItem id="basic-menu" onClick={handleLogout}>
            Logout
          </MenuItem>
        </Menu>
      </AppBar>
    </>
  );
};

export default Navbar;
