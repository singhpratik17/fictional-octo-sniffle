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
      setRating(defaultRating * 2);
    }
  }, [defaultRating]);

  const handleClick = (index) => {
    if (editable) {
      let rating = parseInt(index);
      setRating(rating);
      handleRating(rating / 2);
    }
  };

  return (
    <div>
      {Array.from({ length: 10 }).map((item, index) => {
        return (
          <React.Fragment key={index}>
            <span
              key={index}
              onClick={() => handleClick(index + 1)}
              onMouseOver={() => (editable ? setHover(index + 1) : null)}
              onMouseOut={() => (editable ? setHover(rating) : null)}
              className={`fa fa-star-half star ${
                index < (hover || rating) ? "star-checked" : ""
              } ${editable ? "editable-star pointer" : ""} ${
                index % 2 ? "star-right" : ""
              }`}
            />
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default Rating;
