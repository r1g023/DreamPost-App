import React from "react";
import useForm from "../formHooks/useForm";
import { Box, CircularProgress, styled, TextField } from "@mui/material";
import { useMutation, gql } from "@apollo/client";
import { AUTH_TOKEN } from "../auth-token";
import { Link, useNavigate } from "react-router-dom";
import { LoadingButton } from "@mui/lab";

const StyledBox = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  height: "100vh",
  gap: "1rem",
});

// login user mutation with graphql and auth-token
const LOGIN_USER = gql`
  mutation loginUser($username: String!, $password: String!) {
    loginUser(username: $username, password: $password) {
      id
      username
      email
      token
      dob
      avatar
      dark_mode
      about_you
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
    }
  }
`;

function Login({ setUser }) {
  // custom form created for login component
  const [value, setValue, errors, buttonDisabled, handleChanges] = useForm({
    username: "",
    password: "",
  });
  let navigate = useNavigate();
  function refreshPage() {
    window.location.reload(false);
  }

  // mutation for login user
  const [loginUser, { loading, error }] = useMutation(LOGIN_USER);

  // login user
  async function handleSubmit(e) {
    e.preventDefault();
    let loginNewUser = await loginUser({
      variables: {
        username: value.username,
        password: value.password,
        token: value.token,
      },
      onCompleted: ({ loginUser }) => {
        localStorage.setItem(AUTH_TOKEN, loginUser.token);
        localStorage.setItem("user", JSON.stringify(loginUser));
      },
      context: { clientName: "authLink" },
    });
    setUser(loginNewUser.data.loginUser.username);
    navigate("/");
    refreshPage();
  }

  return (
    <div style={{ backgroundColor: "#002A53", opacity: 0.9 }}>
      <StyledBox>
        <h1 style={{ color: "white" }}>Login</h1>
        <form
          onSubmit={handleSubmit}
          style={{
            background: "white",
            padding: "3rem",
            borderRadius: "0.7rem",
            gap: "1rem",
            display: "flex",
            flexDirection: "column",
            width: "40%",
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

          {/* Show this error if username or password is incorrect */}
          {error ? (
            <p style={{ color: "red", fontSize: "11px" }}>
              Error: please check credentials and try again
            </p>
          ) : null}

          {/* loading button with a loading indicator */}
          <LoadingButton
            variant="contained"
            color="success"
            disabled={buttonDisabled}
            type="submit"
            loading={loading}
            loadingPosition={"start"}
            loadingIndicator={<CircularProgress color="primary" size={20} />}
          >
            Login
          </LoadingButton>
        </form>

        {/*not registered yet link leading to signup form */}
        <p style={{ color: "white" }}>
          Not registered? Click here to
          <Link to="/signup">
            <span
              style={{
                color: "orange",
                padding: "5px",
                borderRadius: "5px",
                textDecoration: "none",
              }}
            >
              Signup
            </span>
          </Link>
        </p>
      </StyledBox>
    </div>
  );
}

export default Login;
