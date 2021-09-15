import React from "react";
import Rating from "../Rating";
import Button from "../Button";
import { useState } from "react";
import { CREATE_REVIEW } from "../../apiConfig/mutation";
import { useMutation } from "@apollo/client";

const AddReview = ({ productId, open = false, handleClose = () => null }) => {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const [createReview, { data, loading, error }] = useMutation(CREATE_REVIEW, {
    onCompleted: () => {
      handleClose();
      setRating(0);
      setHover(0);
      setComment("");
    },
  });

  const addReview = async () => {
    await createReview({
      variables: {
        comment,
        rating,
        productId,
      },
    });
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
            setHover={(rating) => setHover(rating)}
            hover={hover}
            defaultRating={rating}
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
