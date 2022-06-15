import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#00bcd4",
      light: "#800080",
      dark: "#4b0082",
    },
    secondary: {
      main: "#ff9800",
      darkRed: "#ff0000",
    },
    otherColor: {
      main: "#ff9800",
    },
    customColor: {
      main: "#fafad2",
    },
  },
  shape: {
    borderRadius: "10px",
    width: "40%",
  },
  displays: {
    display: "flex",
    displayNone: "none",
  },
});
