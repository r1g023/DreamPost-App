import React from "react";
import useForm from "../formHooks/useForm";
import { Box, Button, styled, TextField } from "@mui/material";

const StyledBox = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  height: "100vh",
  gap: "1rem",
});

function Login({ setUser }) {
  const [value, setValue, errors, buttonDisabled, handleChanges] = useForm({
    username: "",
  });

  function handleSubmit(e) {
    e.preventDefault();
    console.log("username--->", value.username);
    setUser(value.username);
    setValue({ ...value, username: "" });
  }

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
      <h1>USERNAME: {value.username}</h1>
    </div>
  );
}

export default Login;
