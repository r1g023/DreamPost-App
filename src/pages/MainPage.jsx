import { Stack } from "@mui/material";
import React from "react";
import CreatePost from "../components/CreatePost";
import Feed from "../components/Feed";
import Rightbar from "../components/Rightbar";
import Sidebar from "../components/Sidebar";

const MainPage = () => {
  return (
    <>
      {/* <Navbar /> */}
      <Stack direction="row" spacing={2} justifyContent="space-around">
        <Sidebar />
        <Feed />
        <Rightbar />
      </Stack>
      <CreatePost />
    </>
  );
};

export default MainPage;
