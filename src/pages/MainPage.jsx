import { Stack } from "@mui/material";
import React from "react";
import Books from "../components/Books";
import CreatePost from "../components/CreatePost";
import Feed from "../components/Feed";
import Navbar from "../components/Navbar";
import Rightbar from "../components/Rightbar";
import Sidebar from "../components/Sidebar";

const MainPage = ({ posts }) => {
  return (
    <>
      {/* <Navbar /> */}
      <Stack direction="row" spacing={2} justifyContent="space-around">
        <Sidebar />
        <Feed posts={posts} />
        <Rightbar />
      </Stack>
      <CreatePost />
    </>
  );
};

export default MainPage;
