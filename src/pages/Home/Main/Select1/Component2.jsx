import React, { useState } from "react";
import Button from "../../../../components/Button";

export const Component2 = ({ activeButton }) => {
  const Buttons = [
    { title: "AUTO", handleButton: () => {} },
    { title: "MANUAL", handleButton: () => {} },
    { title: "ERROR", handleButton: () => {} },
  ];

  return (
    <div className="flex space-x-4 border border-dashed border-gray-500 p-10 rounded-lg">
      {/* {Buttons.map((item, index) => (
        <Button
          key={index}
          title={item.title}
          handleButton={item.handleButton}
          mode={activeButton}
        />
      ))} */}

      <button
        className={`btn rounded-full w-20 h-20 ${
          activeButton === "AUTO" ? "btn-success" : "btn-outline"
        }`}
      >
        AUTO
      </button>

      <button
        className={`btn rounded-full w-20 h-20 ${
          activeButton === "MANUAL" ? "btn-info" : "btn-outline"
        }`}
      >
        MANUAL
      </button>

      <button
        className={`btn rounded-full w-20 h-20 ${
          activeButton === "ERROR" ? "btn-error" : "btn-outline"
        }`}
      >
        ERROR
      </button>
    </div>
  );
};
