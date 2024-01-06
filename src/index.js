import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "@mui/material";
import App from "./App";
import "./App.css";

import { BrowserRouter } from "react-router-dom";
import { theme } from "./theme";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  ApolloLink,
  HttpLink,
} from "@apollo/client";
import { AUTH_TOKEN } from "./auth-token";

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        getPosts: {
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

const authLink = new HttpLink({
  // uri: "http://localhost:5000/graphql/auth", // <= this is the auth server
  uri: "https://graphql-api-dreampost-api.koyeb.app/graphql/auth", // <= this is the auth server
});

const graphqlAPI = new HttpLink({
  // uri: "http://localhost:5000/graphql",
  uri: "https://graphql-api-dreampost-api.koyeb.app/graphql",
  // get token from local storage and add to headers
  headers: {
    authorization: localStorage.getItem(AUTH_TOKEN) || "",
  },
});

const client = new ApolloClient({
  link: ApolloLink.split(
    (operation) => operation.getContext().clientName === "authLink",
    authLink, // <= apollo will send to this if clientName is "authLink"
    graphqlAPI // <= otherwise will send to this
  ),
  cache: cache,
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ApolloProvider client={client}>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </ApolloProvider>
);
