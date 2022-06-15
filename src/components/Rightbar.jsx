import { Box } from "@mui/material";
import React from "react";

const Rightbar = () => {
  return (
    <Box
      flex={3}
      p={2}
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
