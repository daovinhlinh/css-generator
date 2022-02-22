import React from "react";
import "./styles.css";

const RangeSlider = ({ label, onChange, value, min, max }) => {
  return (
    <div className="rangeSlider">
      <p>{label}</p>
      <div className="slidecontainer">
        <input
          type="range"
          value={value}
          className="slider"
          id="myRange"
          onChange={onChange}
          step={1}
          min={min}
          max={max}
        />
      </div>
    </div>
  );
};

export default RangeSlider;
