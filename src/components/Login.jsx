import React from "react";
import useForm from "../formHooks/useForm";
import { Box, Button, styled, TextField } from "@mui/material";
import { useMutation, gql } from "@apollo/client";
import { AUTH_TOKEN } from "../auth-token";
import { useNavigate } from "react-router-dom";

const StyledBox = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  height: "100vh",
  gap: "1rem",
});

const LOGIN_USER = gql`
  mutation loginUser($username: String!, $password: String!) {
    loginUser(username: $username, password: $password) {
      id
      username
      email
      token
    }
  }
`;

function Login({ setUser }) {
  let navigate = useNavigate();
  const [value, setValue, errors, buttonDisabled, handleChanges] = useForm({
    username: "",
    password: "",
  });
  const [loginUser, { data, loading, error }] = useMutation(LOGIN_USER);

  React.useEffect(() => {
    const authToken = localStorage.getItem(AUTH_TOKEN);
    console.log("get token---->", authToken);
  }, [data]);

  async function handleSubmit(e) {
    e.preventDefault();
    let loginNewUser = await loginUser({
      variables: {
        username: value.username,
        password: value.password,
        token: "",
      },
      onCompleted: ({ loginUser }) => {
        console.log("loginUser------TOKEN>", loginUser);
        localStorage.setItem(AUTH_TOKEN, loginUser.token);
        localStorage.setItem("user", JSON.stringify(loginUser.username));
      },
      context: { clientName: "authLink" },
    });
    setUser(loginNewUser.data.loginUser.username);

    console.log("loginNewUser------>", loginNewUser);
    navigate("/");
  }

  if (loading) return <h1>Loading...</h1>;
  // if (error) return <h1>Error....</h1>;
  console.log("data------>", data);
  console.log("error login------>", error);

  return (
    <div style={{ backgroundColor: "#002A53", opacity: 0.9 }}>
      <StyledBox>
        <h1 style={{ color: "white" }}>User Login</h1>

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
          {/*username */}
          <span style={{ color: "blue", fontWeight: "900" }}>Username</span>
          <TextField
            id="demo-helper-text-aligned"
            label="Username"
            name="username"
            onChange={handleChanges}
            value={value.username}
          />
          {errors.username ? (
            <p style={{ color: "red", fontSize: "11px" }}>{errors.username}</p>
          ) : null}

          {/*password */}
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

          {error ? (
            <p style={{ color: "red", fontSize: "11px" }}>
              Error: please check credentials and try again
            </p>
          ) : null}
          <Button
            variant="contained"
            color="success"
            disabled={buttonDisabled}
            type="submit"
          >
            Login
          </Button>
        </form>
      </StyledBox>
    </div>
  );
}

export default Login;
