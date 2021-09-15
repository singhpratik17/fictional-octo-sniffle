import React from "react";
import Rating from "../Rating";

const ReviewsList = ({ reviews = [] }) => {
  return (
    <div className="d-flex flex-column">
      {reviews.map((item, index) => {
        return (
          <div className="d-flex align-center review-item" key={index}>
            <Rating defaultRating={item.rating} />
            <div>
              <p className="review-comment">
                <span className="text-primary bold rating-val">
                  {item.rating},
                </span>
                {item.comment}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ReviewsList;
