import React from "react";
import { useQuery, gql } from "@apollo/client";

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
  console.log("data----->", data);
  console.log("error----->", error);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error :(</h1>;
  return (
    <div>
      <h1>Books</h1>
      {data.getBooks.map((item) => (
        <div key={item.id}>
          <p>{item.name}</p>
        </div>
      ))}
    </div>
  );
};

export default Books;
