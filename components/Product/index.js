import React, { useEffect, useState } from "react";
import { queryWrapper } from "../../apiConfig/index";
import { GET_PRODUCT } from "../../apiConfig/queries";
import "../Rating/index";
import "../Button/index";
import "../ReviewsList/index";
import "../AddReview/index";
import Rating from "../Rating";
import Button from "../Button";

const ProductCard = () => {
  const [product, setProduct] = useState({
    reviews: [],
  });

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
            <Button />
          </div>
          <hr />
        </div>
        <div className="d-flex flex-column w-100">
          <h1 className="heading sub-heading bold">Reviews</h1>
          {/*<div className="reviews-container">*/}
          {/*  ${this.reviewComp}*/}
          {/*</div>*/}
        </div>
      </div>
      {/*<add-review*/}
      {/*  id="add-review-modal"*/}
      {/*  productId="${this.product.id}"*/}
      {/*></add-review>*/}
    </div>
  );
};

export default ProductCard;
