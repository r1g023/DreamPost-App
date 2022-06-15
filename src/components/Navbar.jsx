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
import React from "react";
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";
import { Notifications } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";

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

const Icons = styled(Box)(({ theme }) => ({
  display: "none", //
  gap: "20px", // gap between icons
  alignItems: "center",
  [theme.breakpoints.up("sm")]: {
    display: "flex",
  },
}));

const UserBox = styled(Box)(({ theme }) => ({
  display: "flex", // flex
  gap: "10px", // gap between icons
  alignItems: "center", // align icons vertically
  [theme.breakpoints.up("sm")]: {
    display: "none", // none
  },
}));

const Navbar = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <AppBar position="sticky">
        <StyledToolbar>
          {/* header*/}
          <Typography
            variant="h4"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            Rigo Dev
          </Typography>

          {/* Search and show Icon when screen is XS */}
          <MenuIcon
            sx={{ display: { xs: "block", sm: "none" }, fontSize: "50px" }}
          />
          <Search>
            <InputBase placeholder="Search..." error={true} />
          </Search>

          {/* Mail and notification icons + avatar */}
          <Icons>
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
          </Icons>

          {/* User avatar and name for smaller screens*/}
          <UserBox onClick={() => setOpen(!open)}>
            <Avatar
              sx={{ height: 30, width: 30 }}
              alt="Github Avatar"
              src="https://avatars.githubusercontent.com/u/57161327?v=4"
            />
            <Typography variant="span">Rigo</Typography>
          </UserBox>
        </StyledToolbar>

        {/* Menu */}
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
          <MenuItem>Logout</MenuItem>
          <MenuItem>FAQ</MenuItem>
        </Menu>
      </AppBar>
    </>
  );
};

export default Navbar;
