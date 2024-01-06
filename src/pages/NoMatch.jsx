import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import imagerror from "../assets/error404.png";
import { UserContext } from "../App";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding-bottom: 25px;
  padding-top: 79px;
`;

const NoMatch = ({ mode }) => {
  const { user } = React.useContext(UserContext);

  React.useEffect(() => {
    if (user.role === "user") {
      document.title = "404 - Page Not Found";
    }
  }, [user.role]);

  return (
    <StyledContainer
      className="noMatch"
      style={{
        background: mode ? "#2C3948" : "",
        color: mode ? "white" : "",
        marginTop: "30px",
        height: "100vh",
      }}>
      <h1
        style={{
          fontSize: "1.8rem",
          textAlign: "center",
          margin: " 0 auto",
        }}>
        This page doesn't exist
      </h1>
      <br />

      <h3 style={{ padding: "15px" }}>
        Please make sure your role is 'admin' and try again
      </h3>
      <br />
      <br />
      <h2 style={{ color: "red" }}>
        Current Role:{" "}
        <span style={{ color: "green", fontSize: "2rem" }}> {user.role}</span>{" "}
      </h2>

      {/* Edit Profile Link remove styling */}
      <Link
        to="/profile"
        style={{
          textDecoration: "none",
          color: "white",
          marginTop: "20px",
          marginBottom: "20px",
        }}>
        <Button variant="contained" color="otherColor">
          Edit Profile
        </Button>
      </Link>

      <img src={imagerror} alt="404" width="100%" className="imageError" />

      <Button variant="contained" sx={{ marginTop: "20px" }}>
        <Link
          to="/"
          style={{ textDecoration: "none", color: mode ? "white" : "white" }}>
          Home
        </Link>
      </Button>
    </StyledContainer>
  );
};

export default NoMatch;
