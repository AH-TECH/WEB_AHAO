import React from "react";

const Button = ({ title,handleButton, mode}) => {
  return (
    <button
        className={`btn hover:text-white ${
          mode === title ? "btn-success" : "btn-active"
        }`}
        onClick={handleButton}
      >
        {title}
      </button>
  );
};

export default Button;
