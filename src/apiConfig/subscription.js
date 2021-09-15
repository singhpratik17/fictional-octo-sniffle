import { gql } from "@apollo/client";

const REVIEW_SUBSCRIPTION = gql`
  subscription onReviewCreated($productId: Int!) {
    reviewCreated(productId: $productId) {
      rating
      reviews {
        comment
        rating
        id
        productId
      }
    }
  }
`;

export { REVIEW_SUBSCRIPTION };
