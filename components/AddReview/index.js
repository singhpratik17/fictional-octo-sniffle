import React from "react";
import { queryWrapper } from "../../apiConfig";
import { CREATE_REVIEW } from "../../apiConfig/mutation";
import Rating from "../Rating";
import Button from "../Button";
import { useState } from "react";

const AddReview = ({
  productId,
  open = false,
  handleClose = () => null,
  getProduct = () => null,
}) => {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

  const addReview = async () => {
    await queryWrapper(CREATE_REVIEW, {
      comment,
      rating,
      productId,
    });
    getProduct();
    handleClose();
  };

  return (
    <div className={`wrapper ${open ? "open" : ""}`}>
      <div
        className="overlay"
        onClick={() => {
          handleClose();
        }}
      />
      <div
        className="dialog"
        role="dialog"
        aria-labelledby="title"
        aria-describedby="content"
      >
        <div className="d-flex flex-column">
          <h1 className="heading">What’s your rating?</h1>
          <p className="f-24 mt-40">Rating</p>
          <Rating
            editable={true}
            handleRating={(rating) => setRating(rating)}
          />
          <p className="f-24 mt-40">Review</p>
          <textarea
            placeholder="Start typing..."
            rows="2"
            maxLength="120"
            className="review-input"
            id="review-comment-input"
            onChange={(evt) => setComment(evt.target.value)}
          />
          <div className="mt-40">
            <Button label="Submit review" handleClick={() => addReview()} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddReview;
