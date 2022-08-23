import React from "react";
import { useQuery, gql } from "@apollo/client";
import { Link, useNavigate, useLocation } from "react-router-dom";
// import userContext from App.js
import { UserContext } from "../App";

const GET_BOOKS = gql`
  query getBooks {
    getBooks {
      id
      name
    }
  }
`;

const Books = () => {
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
  console.log("user on books----->", user);

  return (
    <>
      {user.role === "admin" && (
        <div>
          <h1>Books</h1>
          {data.getBooks.map((book) => (
            <div key={book.id}>
              <p>{book.name}</p>
            </div>
          ))}
          <Link to={"/"} reloadDocument={true}>
            Home --
          </Link>
          <p>
            <Link to="/profile">Profile</Link>
          </p>
        </div>
      )}
    </>
  );
};

export default Books;
