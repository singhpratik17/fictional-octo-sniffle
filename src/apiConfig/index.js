import { ApolloClient, HttpLink, InMemoryCache, split } from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";

const API_HOST = "https://ratings-server.herokuapp.com/graphql";
const WS_HOST = "wss://ratings-server.herokuapp.com/graphql";

const wsLink = new WebSocketLink({
  uri: WS_HOST,
  options: {
    reconnect: true,
  },
});

const httpLink = new HttpLink({
  uri: API_HOST,
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

export const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});
