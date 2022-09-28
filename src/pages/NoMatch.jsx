import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import imagerror from "../assets/imagerror.jpg";
import { UserContext } from "../App";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const NoMatch = () => {
  const { user } = React.useContext(UserContext);
  return (
    <StyledContainer>
      <h1>This page doesn't exist</h1>

      <h3>please make sure your role is 'admin' and try again</h3>
      <h2 style={{ color: "red" }}>Current Role: {user.role}</h2>

      {/* Edit Profile Link remove styling */}
      <Link
        to="/profile"
        style={{ textDecoration: "none", color: "white", marginTop: "20px" }}
      >
        <Button variant="contained" color="otherColor">
          Edit Profile
        </Button>
      </Link>

      <img src={imagerror} alt="404" width="500px" />

      <Button variant="contained">
        <Link to="/" style={{ textDecoration: "none", color: "white" }}>
          Home
        </Link>
      </Button>
    </StyledContainer>
  );
};

export default NoMatch;
