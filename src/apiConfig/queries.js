import { gql } from "@apollo/client";

const GET_PRODUCT = gql`
  query GetProduct($productId: Int!) {
    product(id: $productId) {
      id
      name
      rating
      reviews {
        comment
        rating
      }
    }
  }
`;

export { GET_PRODUCT };
