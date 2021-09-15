import React from "react";
import Rating from "../Rating";
import Button from "../Button";
import ReviewsList from "../ReviewsList";

const ProductCard = ({ product, handleReviewOpen }) => {
  return (
    <div className="d-flex flex-column align-center">
      <div className="d-flex flex-column align-center container">
        <div className="d-flex flex-column w-100">
          <h1 className="heading bold">{product.name}</h1>
          <div className="d-flex justify-between rating-row align-center">
            <div className="d-flex justify-start align-center">
              <p className="heading">{product.rating}</p>
              <div className="star-container-header">
                <Rating defaultRating={product.rating} />
              </div>
            </div>
            <Button handleClick={handleReviewOpen} />
          </div>
          <hr />
        </div>
        <div className="d-flex flex-column w-100">
          <h1 className="heading sub-heading bold">Reviews</h1>
          <ReviewsList reviews={product.reviews} />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
