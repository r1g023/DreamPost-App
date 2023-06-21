import React from "react";
import { useQuery, gql } from "@apollo/client";
import { Link, useNavigate, useLocation } from "react-router-dom";
// import userContext from App.js
import { UserContext } from "../App";
import { Button, ButtonGroup } from "@mui/material";

const GET_BOOKS = gql`
  query getBooks {
    getBooks {
      id
      name
    }
  }
`;

const Books = ({ mode }) => {
  const { user } = React.useContext(UserContext);
  // console.log("user on Books----->", userId);
  const navigate = useNavigate();

  const { data, error, loading } = useQuery(GET_BOOKS);
  React.useEffect(() => {
    // console.log("books array on USE EFFECT---->", data);
    if (user.role === "user") {
      navigate("*");
    }
  }, [data, user.role, navigate]);

  if (loading) return <h1>Loading...</h1>;
  // console.log("user on books----->", user);

  return (
    <>
      {user.role === "admin" && (
        <div
          style={{
            marginTop: "70px",
            paddingTop: "22px",
            paddingLeft: "22px",
            paddingRight: "22px",
            height: "100vh",
            background: mode ? "#2C394B" : "",
            color: mode ? "white" : "",
          }}>
          <h1 className="books">Books</h1>
          {data.getBooks.map((book) => (
            <div key={book.id}>
              <ul>
                <li>{book.name}</li>
                <br />
              </ul>
            </div>
          ))}

          <h2>Nothing to see here, just Harry Potter Books!</h2>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: "20px",
            }}>
            <ButtonGroup
              variant="contained"
              aria-label="outlined primary button group">
              <Button color="primary">
                <Link
                  to="/profile"
                  style={{ textDecoration: "none", color: "white" }}>
                  Profile
                </Link>
              </Button>

              <Button
                sx={{ marginLeft: "10px" }}
                onClick={() => {
                  // refresh page
                  window.location.reload();
                }}>
                <Link
                  // to={"/"}
                  reloadDocument={true}
                  style={{ textDecoration: "none", color: "white" }}>
                  Home
                </Link>
              </Button>
            </ButtonGroup>
          </div>
        </div>
      )}
    </>
  );
};

export default Books;
