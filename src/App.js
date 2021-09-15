import React, { useEffect, useState } from "react";
import { queryWrapper } from "./apiConfig";
import { GET_PRODUCT } from "./apiConfig/queries";
import ProductCard from "./components/Product";
import AddReview from "./components/AddReview";

const App = () => {
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState({
    reviews: [],
  });
  const [reviewModal, setReviewModal] = useState(false);

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    setLoading(true);
    const data = await queryWrapper(GET_PRODUCT, { productId: 1 });
    if (data) {
      setProduct(data.product);
    }
    setLoading(false);
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
        getProduct={getProduct}
      />
    </>
  ) : (
    <div className="d-flex justify-center mt-40">Getting product...</div>
  );
};

export default App;
