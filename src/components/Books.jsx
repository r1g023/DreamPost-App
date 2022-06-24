import React from "react";
import { useQuery, gql } from "@apollo/client";
import { Link } from "react-router-dom";

const GET_BOOKS = gql`
  query getBooks {
    getBooks {
      id
      name
    }
  }
`;

const Books = () => {
  const { data, error, loading } = useQuery(GET_BOOKS);

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
      <Link to="/home">Home</Link>
    </div>
  );
};

export default Books;
