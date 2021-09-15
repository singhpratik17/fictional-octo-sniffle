import React, { useEffect, useState } from "react";
import { GET_PRODUCT } from "./apiConfig/queries";
import ProductCard from "./components/Product";
import AddReview from "./components/AddReview";
import { useLazyQuery, useSubscription } from "@apollo/client";
import { REVIEW_SUBSCRIPTION } from "./apiConfig/subscription";

const App = () => {
  const [product, setProduct] = useState({
    reviews: [],
  });
  const [reviewModal, setReviewModal] = useState(false);
  const [getProduct, { loading }] = useLazyQuery(GET_PRODUCT, {
    onCompleted: (data) => {
      setProduct(data.product);
    },
  });

  useSubscription(REVIEW_SUBSCRIPTION, {
    variables: { productId: 1 },
    onSubscriptionData: ({ subscriptionData }) => {
      if (subscriptionData.data.reviewCreated) {
        const { rating, reviews } = subscriptionData.data.reviewCreated;
        setProduct({
          ...product,
          rating,
          reviews,
        });
      }
    },
  });

  useEffect(() => {
    getProductQuery();
  }, []);

  const getProductQuery = () => {
    getProduct({
      variables: {
        productId: 1,
      },
    });
  };

  return !loading ? (
    <>
      <ProductCard
        product={product}
        handleReviewOpen={() => setReviewModal(true)}
      />
      <AddReview
        open={reviewModal}
        productId={product.id}
        handleClose={() => {
          setReviewModal(false);
        }}
      />
    </>
  ) : (
    <div className="d-flex justify-center mt-40">Getting product...</div>
  );
};

export default App;
