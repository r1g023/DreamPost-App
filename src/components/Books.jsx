import React from "react";
import { useQuery, gql } from "@apollo/client";
import { Link, useNavigate } from "react-router-dom";
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
  const { userId } = React.useContext(UserContext);
  console.log("user on Books----->", userId);
  const navigate = useNavigate();
  const { data, error, loading } = useQuery(GET_BOOKS);
  React.useEffect(() => {
    console.log("books array on USE EFFECT---->", data);
  }, [data]);

  if (loading) return <h1>Loading...</h1>;
  if (error) {
    return (
      <>
        <h1>Error getting books, please refresh page</h1>
        <button onClick={() => window.location.reload()}>Refresh</button>
      </>
    );
  }

  return (
    <div>
      <h1>Books</h1>
      {data.getBooks.map((book) => (
        <div key={book.id}>
          <p>{book.name}</p>
        </div>
      ))}
      <Link to="/">Home</Link>
    </div>
  );
};

export default Books;
