import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#002A53",
      light: "#800080",
      purple: "#4b0082",
    },
    secondary: {
      main: "#C3555C",
    },
    otherColor: {
      main: "#ff9800",
    },
    customColor: {
      main: "#3e4444",
    },
    greenLike: {
      main: "#008000",
    },
    limeGreen: {
      main: "#00ff00",
    },
  },
  shape: {
    borderRadius: 10,
    width: "40%",
  },
  displays: {
    display: "flex",
    displayNone: "none",
  },
});
