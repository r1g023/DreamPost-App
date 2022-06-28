import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import imagerror from "../assets/imagerror.jpg";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const NoMatch = () => {
  return (
    <StyledContainer>
      <h2>This page doesn't exist</h2>

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
