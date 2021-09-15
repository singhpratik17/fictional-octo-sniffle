import React, { useEffect, useState } from "react";

const Rating = ({
  defaultRating,
  editable = false,
  handleRating = () => null,
}) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  useEffect(() => {
    if (defaultRating) {
      setRating(defaultRating);
    }
  }, [defaultRating]);

  const handleClick = (index) => {
    if (editable) {
      let rating = parseInt(index);
      setRating(rating);
      handleRating(rating);
    }
  };

  return (
    <div>
      {Array.from({ length: 5 }).map((item, index) => {
        return (
          <span
            key={index}
            onClick={() => handleClick(index + 1)}
            onMouseOver={() => (editable ? setHover(index + 1) : null)}
            onMouseOut={() => (editable ? setHover(rating) : null)}
            className={`fa fa-star star ${
              index < (hover || rating) ? "star-checked" : ""
            } ${editable ? "editable-star pointer" : ""}`}
          />
        );
      })}
    </div>
  );
};

export default Rating;
