import React from "react";
import { styled } from "@mui/system";
import { IconButton, InputBase, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

const Search = styled(Paper)(({ theme }) => ({
  background: "white",
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  maxWidth: "400px",
  width: "100%",
  borderRadius: theme.shape.borderRadius,
}));

const NavBarSearch = ({
  setSearchValue,
  handleSubmit,
  searchValue,
  clearResults,
  errorMessage,
  mode,
}) => {
  return (
    <Search
      className="searchBar"
      sx={{
        position: "fixed",
        marginTop: "19px",
        zIndex: "1",
        // marginLeft: searchValue ? "-15px" : "0px",
        marginLeft: errorMessage ? "10px" : searchValue ? "8px" : "18px",

        border: mode ? "" : "1px solid orange",
        boxShadow: mode ? "0px 0px 7px 0px orange" : "0px 0px 12px 0px gray",
        // hover
        "&:hover": {
          boxShadow: mode
            ? "0px 0px 12px 0px orange"
            : "0px 0px 12px 0px orange",
        },
        maxWidth: "400px",
        minWidth: "200px",
        width: "100%",
      }}
    >
      {/* Search Input */}
      <InputBase
        sx={{ ml: 1, flex: 1, maxWidth: "400px", width: "100%" }}
        placeholder="Search Posts"
        inputProps={{ "aria-label": "search posts" }}
        name="searchValue"
        onChange={setSearchValue}
        value={searchValue}
      />

      {/* Search Icon to search after inputting your search words */}
      <IconButton
        type="submit"
        sx={{ p: "10px", ml: 1 }}
        aria-label="search"
        onClick={handleSubmit}
      >
        <SearchIcon />
      </IconButton>

      {/* X to clear the results from the page */}
      {searchValue && (
        <span title="clear search results and go back to posts">
          <ClearIcon
            sx={{
              cursor: "pointer",
            }}
            color="error"
            title="clear search results"
            onClick={clearResults}
          />
        </span>
      )}
    </Search>
  );
};

export default NavBarSearch;
