import { Box, Button, Stack } from "@mui/material";
import { Container } from "@mui/system";
import Feed from "./components/Feed";
import Navbar from "./components/Navbar";
import Rightbar from "./components/Rightbar";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <Box sx={{ border: "2px solid green", background: "gray" }}>
      {/* <Navbar /> */}
      <Stack direction="row" spacing={2} justifyContent="space-around">
        <Sidebar />
        <Feed />
        <Rightbar />
      </Stack>
    </Box>
  );
}

export default App;
