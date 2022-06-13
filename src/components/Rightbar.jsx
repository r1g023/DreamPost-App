import { Box } from "@mui/material";
import React from "react";

const Rightbar = () => {
  return (
    <Box
      p={2}
      flex={3}
      sx={{
        background: "purple",
        display: {
          xs: "none",
          sm: "block",
        },
      }}
    >
      Rightbar
    </Box>
  );
};

export default Rightbar;
