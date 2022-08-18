import React, { useContext } from "react";
import { useMutation, useQuery, gql } from "@apollo/client";
import { UserContext } from "../App";
import { Link, useNavigate } from "react-router-dom";

const GET_USER = gql`
  query getUserById($id: Int!) {
    getUserById(id: $id) {
      id
      first_name
      last_name
      dob
      email
      username
      role
      avatar
      dark_mode
      about_you
      created_at
      updated_at
    }
  }
`;

const Profile = () => {
  const { user } = useContext(UserContext);
  console.log("user on Profile", user);
  const navigate = useNavigate();

  const { error, data } = useQuery(GET_USER, {
    variables: { id: user.id },
  });
  console.log("data on Profile", data);

  React.useEffect(() => {
    console.log("data on Profile", data);
  }, [data, user]);

  if (error && user.role === "user") navigate("*");
  return (
    <div>
      <h1>Profile</h1>
      <h2>
        Books <Link to="/books">Books</Link>
      </h2>
      {data && (
        <div>
          <h2>First_Name: {data.getUserById.first_name}</h2>
          <h2>Last_Name: {data.getUserById.last_name}</h2>
          <h2>DOB: {data.getUserById.dob}</h2>
          <h2>Email: {data.getUserById.email}</h2>
          <h2>Username: {data.getUserById.username}</h2>
          <h2>Role: {data.getUserById.role}</h2>
          <h2>Dark_Mode: {data.getUserById.dark_mode ? "true" : "false"}</h2>
          <h2>About_You: {data.getUserById.about_you}</h2>
          <img src={data.getUserById.avatar} alt="avatar" height="100px" />
        </div>
      )}
    </div>
  );
};

export default Profile;
