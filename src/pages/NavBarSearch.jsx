import React from "react";
import { styled } from "@mui/system";
import { IconButton, InputBase, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { gql, useQuery, useMutation } from "@apollo/client";

const GET_POSTS = gql`
  query getPosts {
    getPosts {
      id
      title
      date
      image
      post
      liked
      count
      user
      user_id
      created_at
      updated_at
      comments {
        id
        comment
        liked
        count
        user
        post_id
      }
    }
  }
`;

const Search = styled(Paper)(({ theme }) => ({
  background: "white",
  border: "2px solid red",
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  width: "400px",
  borderRadius: theme.shape.borderRadius,
}));

const NavBarSearch = () => {
  const [search, setSearch] = React.useState({
    posts: [],
    searchPosts: "",
    errors: "",
  });
  const { loading, error, data } = useQuery(GET_POSTS);
  React.useEffect(() => {}, [search.posts, search.errors]);

  // handle changes
  const handleChange = (e) => {
    console.log(e.target.name, e.target.value);
    setSearch({
      ...search,
      [e.target.name]: e.target.value,
    });
  };

  // handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(search);
    // add data to search.posts array
    let postData = data.getPosts.filter((item) => {
      console.log("item search", item);
      // if no search input or empty then return error and save to errors in state
      if (search.searchPosts === "" || item.length === 0) {
        setSearch({
          ...search,
          errors: "Please enter a search term",
        });
      }

      if (item.title.includes(search.searchPosts.toLowerCase())) return item;
      // get info from GET_POSTS query
      if (item.date.includes(search.searchPosts.toLowerCase())) return item;
      if (item.post.includes(search.searchPosts.toLowerCase())) return item;
      if (item.user.includes(search.searchPosts.toLowerCase())) return item;
      if (item.image.includes(search.searchPosts.toLowerCase())) return item;
      //   // get comment data
      //   if (item.comments.comment.includes(search.searchPosts.toLowerCase()))
      //     return item;
      //   if (item.comments.user.includes(search.searchPosts.toLowerCase()))
      //     return item;
      //   if (item.comments.date.includes(search.searchPosts.toLowerCase()))
      //     return item;
    });

    setSearch({
      ...search,
      posts: postData,
    });
  };

  return (
    <>
      <Search sx={{ display: { xs: "none", sm: "none", md: "block" } }}>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search Google Maps"
          inputProps={{ "aria-label": "search google maps" }}
          name="searchPosts"
          onChange={handleChange}
        />
        <IconButton
          type="submit"
          sx={{ p: "10px", ml: 20 }}
          aria-label="search"
          onClick={handleSubmit}
        >
          <SearchIcon />
        </IconButton>
      </Search>
      <>
        {search.posts.map((post) => {
          console.log("post search Results", post);
          return (
            <div key={post.id} style={{ border: "5px solid red" }}>
              <h1>{post.title}</h1>
              <p>{post.post}</p>
            </div>
          );
        })}
      </>
      {search.errors && <h1>Error: {search.errors}</h1>}
    </>
  );
};

export default NavBarSearch;
