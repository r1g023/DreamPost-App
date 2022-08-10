import React from "react";
import { styled } from "@mui/system";
import { IconButton, InputBase, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const Search = styled(Paper)(({ theme }) => ({
  background: "white",
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  width: "400px",
  borderRadius: theme.shape.borderRadius,
}));

const NavBarSearch = ({ setSearchValue, handleSubmit, searchValue }) => {
  return (
    <Search>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search Posts"
        inputProps={{ "aria-label": "search posts" }}
        name="searchValue"
        onChange={setSearchValue}
        value={searchValue}
      />
      <IconButton
        type="submit"
        sx={{ p: "10px", ml: 1 }}
        aria-label="search"
        onClick={handleSubmit}
      >
        <SearchIcon />
      </IconButton>
    </Search>
  );
};

export default NavBarSearch;