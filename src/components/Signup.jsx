import React from "react";
import {
  Box,
  Button,
  InputLabel,
  MenuItem,
  Select,
  styled,
  TextField,
} from "@mui/material";
import { useMutation, useQuery, gql } from "@apollo/client";
import { Link, useNavigate } from "react-router-dom";
import useSignupForm from "../formHooks/useSignupForm";

const StyledBox = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  height: "100vh",
  gap: "1rem",
});

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

const GET_USERS = gql`
  query getUsers {
    getUsers {
      id
      username
      email
    }
  }
`;

const Signup = () => {
  //make this Signup component similar to Login component
  let navigate = useNavigate();
  const [value, setValue, errors, buttonDisabled, handleChanges] =
    useSignupForm({
      email: "",
      username: "",
      password: "",
      role: "",
    });
  let [result, setResult] = React.useState("");

  console.log("value--->", value);
  const [registerUser, { loading, error }] = useMutation(REGISTER_USER);
  const { data } = useQuery(GET_USERS);

  React.useEffect(() => {
    console.log("result--->", result);
    let info = result;
    return info;
  }, [result]);

  async function handleSubmit(e) {
    e.preventDefault();
    let registerNewUser = await registerUser({
      variables: {
        email: value.email,
        username: value.username,
        password: value.password,
        role: value.role,
      },
      context: { clientName: "authLink" },
      //check if username exist then return error
    });
    console.log("registerNEW USER----->", registerNewUser);
    return registerNewUser;
  }

  if (loading) return <h1>Loading...</h1>;
  // if (error) return <h1>Error</h1>;
  console.log("error register------>", error);
  console.log("data register GET------>", data);

  return (
    <div style={{ backgroundColor: "#002A53", opacity: 0.9 }}>
      <h1>Signup</h1>
      <StyledBox>
        <form
          onSubmit={handleSubmit}
          style={{
            background: "white",
            padding: "3rem",
            borderRadius: "0.7rem",
            gap: "1rem",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Email */}
          <span style={{ color: "blue", fontWeight: "900" }}>email</span>
          <TextField
            id="demo-helper-text-aligned"
            label="email"
            name="email"
            onChange={handleChanges}
            value={value.email}
          />
          {errors.email ? (
            <p style={{ color: "red", fontSize: "11px" }}>{errors.email}</p>
          ) : null}

          {/* Username */}
          <span style={{ color: "blue", fontWeight: "900" }}>Username</span>
          <TextField
            id="demo-helper-text-aligned"
            label="username"
            name="username"
            onChange={handleChanges}
            value={value.username}
          />
          {errors.username ? (
            <p style={{ color: "red", fontSize: "11px" }}>{errors.username}</p>
          ) : null}

          {/* Password */}
          <span style={{ color: "blue", fontWeight: "900" }}>Password</span>
          <TextField
            id="demo-helper-text-aligned"
            label="password"
            name="password"
            onChange={handleChanges}
            value={value.password}
          />
          {errors.password ? (
            <p style={{ color: "red", fontSize: "11px" }}>{errors.password}</p>
          ) : null}

          {/* Role select values input*/}
          <InputLabel id="demo-simple-select-label">Role</InputLabel>

          <Select
            sx={{ color: "black" }}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            name="role"
            label="Role"
            onChange={handleChanges}
            value={value.role}
          >
            <MenuItem value={"admin"}>admin</MenuItem>
            <MenuItem value={"user"}>user</MenuItem>
          </Select>
          {errors.role ? (
            <p style={{ color: "red", fontSize: "11px" }}>{errors.role}</p>
          ) : null}

          {error ? (
            <p style={{ color: "red", fontSize: "11px" }}>
              Error: please {result}
            </p>
          ) : null}

          {/* Signup Button */}
          <Button
            variant="contained"
            color="success"
            disabled={buttonDisabled}
            type="submit"
          >
            Signup
          </Button>
        </form>
      </StyledBox>
    </div>
  );
};

export default Signup;
