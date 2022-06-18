import React from "react";
import { useMutation, gql } from "@apollo/client";

const REGISTER_USER = gql`
  mutation registerUser(
    $email: String!
    $username: String!
    $password: String!
    $role: String!
  ) {
    registerUser(
      email: $email
      username: $username
      password: $password
      role: $role
    ) {
      id
      username
      email
      password
      role
    }
  }
`;

const Signup = () => {
  const [createUser, setCreateUser] = React.useState({
    email: "",
    username: "",
    password: "",
    role: "",
  });
  const [registerUser, { data, loading, error }] = useMutation(REGISTER_USER);

  async function handleSubmit(e) {
    e.preventDefault();
    let newUser = await registerUser({
      variables: {
        email: createUser.email,
        username: createUser.username,
        password: createUser.password,
        role: createUser.role,
      },
      context: { clientName: "authAPI" },
    });
    console.log("newUser------>", newUser);
  }

  function handleChanges(e) {
    console.log(e.target.name, ":", e.target.value);
    setCreateUser({ ...createUser, [e.target.name]: e.target.value });
  }

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error :(</h1>;
  console.log("data------>", data);
  return (
    <div>
      Signup
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="email"
          value={createUser.email}
          onChange={handleChanges}
          placeholder="email"
        />
        <input
          type="text"
          name="username"
          value={createUser.username}
          onChange={handleChanges}
          placeholder="username"
        />

        <input
          type="password"
          name="password"
          value={createUser.password}
          onChange={handleChanges}
          placeholder="password"
        />
        <input
          type="text"
          name="role"
          value={createUser.role}
          onChange={handleChanges}
          placeholder="role"
        />
        <button type="submit">Signup User</button>
      </form>
    </div>
  );
};

export default Signup;
