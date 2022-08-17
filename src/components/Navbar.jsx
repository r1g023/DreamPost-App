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
            {/* Search and show Icon when screen is XS */}
            <MenuIcon
              sx={{ display: { xs: "block", sm: "none" }, fontSize: "50px" }}
            />
            {/* {user.username ? <NavBarSearch /> : setUser("")} */}

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
              <Typography variant="span" sx={{ marginRight: "5px" }}>
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
          }}
        >
          {/* Profile page */}
          <MenuItem>
            <Link to="/profile">Profile</Link>
          </MenuItem>

          {/*Book page */}
          <MenuItem>
            <Link to="/books">Books</Link>
          </MenuItem>

          {/* Logout */}
          <MenuItem
            onClick={() => {
              window.localStorage.removeItem("auth-token");
              window.localStorage.removeItem("user");
              navigate("/login");
              // remove user upon logout
              setUser("");
            }}
          >
            Logout
          </MenuItem>
        </Menu>
      </AppBar>
    </>
  );
};

export default Navbar;
