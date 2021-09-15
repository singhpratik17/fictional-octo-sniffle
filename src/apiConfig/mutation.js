import { gql } from "@apollo/client";

const CREATE_REVIEW = gql`
  mutation CreateReview($comment: String, $productId: Int!, $rating: Float!) {
    createReview(comment: $comment, productId: $productId, rating: $rating) {
      id
    }
  }
`;

export { CREATE_REVIEW };
