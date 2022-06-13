import { Box } from "@mui/material";
import React from "react";

const Sidebar = () => {
  return (
    <Box
      flex={2}
      p={2}
      sx={{
        background: "skyblue",
        display: {
          xs: "none",
          sm: "block",
        },
      }}
    >
      Sidebar
    </Box>
  );
};

export default Sidebar;
