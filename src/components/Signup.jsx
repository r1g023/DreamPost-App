import React from "react";
import {
  Box,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  styled,
  TextField,
} from "@mui/material";
import { useMutation, useQuery, gql } from "@apollo/client";
import { Link, useNavigate } from "react-router-dom";
import useSignupForm from "../formHooks/useSignupForm";
import { LoadingButton } from "@mui/lab";

import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import InputAdornment from "@mui/material/InputAdornment";

const StyledBox = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  height: "100vh",
  gap: "1rem",
});

// graphql post user mutation
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
  // this custom form hook is used to handle the form, less coe on signup component
  const [value, setValue, errors, buttonDisabled, handleChanges] =
    useSignupForm({
      email: "",
      username: "",
      password: "",
      role: "",
    });
  let navigate = useNavigate();
  // mutation for signup user
  const [registerUser, { loading, error }] = useMutation(REGISTER_USER);

  //password visibility
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  // for the loading spinner
  const [loadings, setLoading] = React.useState(false);

  const handleClick = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      navigate("/login");
    }, 3000);
  };

  // Signup user
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
    });
    handleClick();
  }

  // signupError to validate if user/email already exist in database upon signup
  let signupError = "";
  let signupErrorMessage = "";
  if (error) {
    signupError = error.message.split(" ").slice(-1).join(" ");
    signupErrorMessage = signupError.split("_").slice(1, 2).join(" ");
  }

  return (
    <div style={{ backgroundColor: "#002A53", opacity: 0.9 }}>
      <StyledBox>
        <h1 style={{ color: "white" }}>Register</h1>
        <form
          onSubmit={handleSubmit}
          style={{
            background: "white",
            padding: "3rem",
            borderRadius: "0.7rem",
            gap: "1rem",
            display: "flex",
            flexDirection: "column",
            width: "50%",
          }}>
          {/* Email */}
          <span style={{ color: "blue", fontWeight: "900" }}>Email</span>
          <TextField
            id="demo-helper-text-aligned"
            label="Email"
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
            label="Username"
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
            id="outlined-adornment-password"
            label="Password"
            type={showPassword ? "text" : "password"}
            name="password"
            value={value.password}
            onChange={handleChanges}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    // onClick={handleClickShowPassword}
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {errors.password ? (
            <p style={{ color: "red", fontSize: "11px" }}>{errors.password}</p>
          ) : null}

          {/* Role select values input */}
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-helper-label">Role</InputLabel>
            <Select
              sx={{ color: "black" }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="role"
              label="Role"
              onChange={handleChanges}
              value={value.role}>
              <MenuItem value="">
                <em>Must Select One</em>
              </MenuItem>
              <MenuItem value={"admin"}>admin</MenuItem>
              <MenuItem value={"user"}>user</MenuItem>
            </Select>
          </FormControl>
          {errors.role ? (
            <p style={{ color: "red", fontSize: "11px" }}>{errors.role}</p>
          ) : null}

          {/* this will show if either username or email is already in Database */}
          {error ? (
            <p style={{ color: "red", fontSize: "11px" }}>
              Error:
              {signupErrorMessage === "email"
                ? "This email address is already being used"
                : signupErrorMessage === "username"
                ? "This username is already being used"
                : null}
            </p>
          ) : null}

          {/* Signup Button with a loader spinner */}
          <LoadingButton
            variant="contained"
            color="success"
            disabled={buttonDisabled}
            type="submit"
            // loading={loading}
            loadingPosition={"center"}
            loading={loadings}
            startIcon={
              loadings ? (
                <CircularProgress color="inherit" size={20} />
              ) : (
                "Signup"
              )
            }
            loadingIndicator={
              <CircularProgress color="primary" size={20} />
            }></LoadingButton>
        </form>

        {/* if registered, go back to login */}
        <p style={{ color: "white" }}>
          Already registered? Click here to
          <Link to="/login">
            <span
              style={{
                color: "orange",
                padding: "5px",
                borderRadius: "5px",
                textDecoration: "none",
              }}>
              Login
            </span>
          </Link>
        </p>
      </StyledBox>
    </div>
  );
};

export default Signup;
