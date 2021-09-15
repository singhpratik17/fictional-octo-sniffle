import React from "react";

const Button = ({ label = "Add review", handleClick = () => null }) => {
  return (
    <div className="btn" onClick={handleClick}>
      {label}
    </div>
  );
};

export default Button;
