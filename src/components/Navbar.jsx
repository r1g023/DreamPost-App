import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import { styled } from "@mui/system";
import AdbIcon from "@mui/icons-material/Adb";
import React from "react";

const StyledToolbar = styled(Toolbar)`
  display: "flex",
  justifyContent: "space-between",
`;

const Navbar = () => {
  return (
    <AppBar position="relative">
      <StyledToolbar>
        <Typography variant="h6" sx={{ display: { xs: "none", sm: "block" } }}>
          RIGO DEV
        </Typography>

        <AdbIcon sx={{ display: { xs: "block", sm: "none" } }} />
      </StyledToolbar>
    </AppBar>
  );
};

export default Navbar;
