import React from "react";

const Rating = ({
  defaultRating,
  editable = false,
  handleRating = () => null,
  setHover = () => null,
  hover = 0,
}) => {
  const handleClick = (index) => {
    if (editable) {
      let rating = parseInt(index);
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
              onMouseOut={() => (editable ? setHover(defaultRating * 2) : null)}
              className={`fa fa-star-half star ${
                index < (hover || defaultRating * 2) ? "star-checked" : ""
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
