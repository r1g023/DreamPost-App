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

const UPDATE_USER = gql`
  mutation updateUser(
    $id: Int!
    $first_name: String
    $last_name: String
    $dob: String
    $email: String
    $role: String
    $avatar: String
    $about_you: String
  ) {
    updateUser(
      id: $id
      first_name: $first_name
      last_name: $last_name
      dob: $dob
      email: $email
      role: $role
      avatar: $avatar
      about_you: $about_you
    ) {
      id
      username
      first_name
      last_name
      email
      token
      dob
      avatar
      dark_mode
      about_you
      role
      created_at
      updated_at
      posts {
        id
        title
        date
        image
        post
        liked
        user_id
        created_at
        updated_at
        comments {
          id
          comment
          liked
          post_id
          created_at
          updated_at
        }
      }
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

const Profile = () => {
  const { user, setUser } = useContext(UserContext);
  console.log("user on Profile****", user);
  const navigate = useNavigate();
  // form for updating user profile
  const [updateUserID, setUpdateUserID] = React.useState({
    id: "",
    first_name: "",
    last_name: "",
    dob: null,

    role: "",
    avatar: "",
    about_you: "",
  });

  const { error, data } = useQuery(GET_USER, {
    variables: { id: user.id },
  });
  const [updateUser] = useMutation(UPDATE_USER);

  React.useEffect(() => {
    console.log("data on Profile", data);
  }, [data, user.role]);

  // handle changes to the form
  const handleChanges = (e) => {
    setUpdateUserID({ ...updateUserID, [e.target.name]: e.target.value });
  };

  // handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("updateUserID", updateUserID);
    updateUser({
      variables: {
        id: user.id,
        first_name: updateUserID.first_name,
        last_name: updateUserID.last_name,
        dob: updateUserID.dob,

        role: updateUserID.role,
        avatar: updateUserID.avatar,
        about_you: updateUserID.about_you,
      },
    });
  };

  return (
    <div>
      {/* form to update user */}

      <h1>Profile</h1>
      <form onClick={handleSubmit}>
        <input
          type="text"
          name="first_name"
          placeholder="first_name"
          onChange={handleChanges}
        />
        {/* generate inputs for remaining fields */}
        <input
          type="text"
          name="last_name"
          placeholder="last_name"
          onChange={handleChanges}
        />
        <input
          type="text"
          name="dob"
          placeholder="dob"
          onChange={handleChanges}
        />

        <input
          type="text"
          name="role"
          placeholder="role"
          onChange={handleChanges}
        />
        <input
          type="text"
          name="avatar"
          placeholder="avatar"
          onChange={handleChanges}
        />
        <input
          type="text"
          name="about_you"
          placeholder="about_you"
          onChange={handleChanges}
        />

        <button>Update</button>
      </form>

      <h2>
        Books{" "}
        <Link to="/books" reloadDocument={user.role === "admin" ? true : ""}>
          Books
        </Link>
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
