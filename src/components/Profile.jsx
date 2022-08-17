import React, { useContext } from "react";
import { useMutation, useQuery, gql } from "@apollo/client";
import { UserContext } from "../App";

const GET_USER = gql`
  query getUsers {
    getUsers {
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
  const { loading, error, data } = useQuery(GET_USER);
  console.log("user profile data---->", data);
  return <div>Profile</div>;
};

export default Profile;
