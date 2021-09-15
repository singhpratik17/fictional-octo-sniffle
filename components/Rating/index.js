import React, { useEffect, useState } from "react";

const Rating = ({ defaultRating, editable = false }) => {
  const [rating, setRating] = useState(0);

  useEffect(() => {
    if (defaultRating) {
      setRating(defaultRating);
    }
  }, [defaultRating]);

  const handleMouseOver = (index) => {
    if (editable) {
      setRating(parseInt(index));
    }
  };

  return (
    <div>
      {Array.from({ length: 5 }).map((item, index) => {
        return (
          <span
            key={index}
            onClick={() => handleMouseOver(index)}
            onMouseOver={() => handleMouseOver(index)}
            onMouseOut={() => handleMouseOver(index)}
            className={`fa fa-star star ${
              index <= rating ? "star-checked" : ""
            }`}
          />
        );
      })}
    </div>
  );
};

export default Rating;
