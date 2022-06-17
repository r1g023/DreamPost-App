import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#002A53",
      light: "#800080",
      dark: "#4b0082",
    },
    secondary: {
      main: "#FF0000",
    },
    otherColor: {
      main: "#ff9800",
    },
    customColor: {
      main: "#3e4444",
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
