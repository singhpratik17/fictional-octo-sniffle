import { GraphQLClient } from "graphql-request";

const API_HOST = "https://ratings-server.herokuapp.com/graphql";

const client = new GraphQLClient(API_HOST, { headers: {} });

const queryWrapper = async (query, variables) => {
  return await client.request(query, variables);
};

export { queryWrapper };
