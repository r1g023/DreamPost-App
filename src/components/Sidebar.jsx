import { Box } from "@mui/material";
import React from "react";

const Sidebar = () => {
  return (
    <Box
      flex={2}
      sx={{
        backgroundColor: "primary.dark",
        "&:hover": {
          backgroundColor: "primary.main",
          opacity: [0.9, 0.8, 0.7],
        },
      }}
    >
      Sidebar
    </Box>
  );
};

export default Sidebar;
