import { ApolloClient, InMemoryCache } from "@apollo/client";

const API_HOST = "http://localhost:4000/graphql";

export const client = new ApolloClient({
  uri: API_HOST,
  cache: new InMemoryCache(),
});
