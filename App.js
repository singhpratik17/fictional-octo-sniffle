import React, { useEffect, useState } from "react";
import { queryWrapper } from "./apiConfig";
import { GET_PRODUCT } from "./apiConfig/queries";
import ProductCard from "./components/Product";
import AddReview from "./components/AddReview";

const App = () => {
  const [product, setProduct] = useState({
    reviews: [],
  });
  const [reviewModal, setReviewModal] = useState(false);

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    const data = await queryWrapper(GET_PRODUCT, { productId: 1 });
    if (data) {
      setProduct(data.product);
    }
  };

  return (
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
        getProduct={getProduct}
      />
    </>
  );
};

export default App;
