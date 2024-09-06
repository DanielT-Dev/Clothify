import React, { useState } from 'react';

import '../styles/PriceSlider.css'; // Import the CSS file for styling


function PriceSlider({priceRange, setPriceRange}) {

  const handleMinSliderChange = (event) => {
    const newMinValue = Number(event.target.value);
    if (newMinValue <= priceRange[1]) {
      setPriceRange([newMinValue, priceRange[1]]);
    }
  };

  const handleMaxSliderChange = (event) => {
    const newMaxValue = Number(event.target.value);
    if (newMaxValue >= priceRange[0]) {
      setPriceRange([priceRange[0], newMaxValue]);
    }
  };

  const handleMinChange = (event) => {
    const newMinValue = Number(event.target.value);
    if (newMinValue <= priceRange[1]) {
      setPriceRange([newMinValue, priceRange[1]]);
    }
  };

  const handleMaxChange = (event) => {
    const newMaxValue = Number(event.target.value);
    if (newMaxValue >= priceRange[0]) {
      setPriceRange([priceRange[0], newMaxValue]);
    }
  };

  return (
    <div className="price-range-container">
      <div className="input-container">
        <label>
          Min Price:
          <input 
            type="number" 
            value={priceRange[0]} 
            min="0" 
            max={priceRange[1]} 
            onChange={handleMinChange} 
            className="price-input"
          />
        </label>
        <label>
          Max Price:
          <input 
            type="number" 
            value={priceRange[1]} 
            min={priceRange[0]} 
            max="500" 
            onChange={handleMaxChange} 
            className="price-input"
          />
        </label>
      </div>
      <div className="slider-container">
        <input 
          type="range" 
          min="0" 
          max="500" 
          value={priceRange[0]} 
          onChange={handleMinSliderChange} 
          className="slider"
        />
        <input 
          type="range" 
          min="0" 
          max="500" 
          value={priceRange[1]} 
          onChange={handleMaxSliderChange} 
          className="slider"
        />
      </div>
      <p className="price-range-display">
        Selected Price Range: <span>${priceRange[0]}</span> - <span>${priceRange[1]}</span>
      </p>
    </div>
  );
}

export default PriceSlider;
