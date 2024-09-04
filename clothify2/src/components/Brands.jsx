import React, { useState } from 'react';
import '../styles/Brands.css'; // Import the CSS file for styling

function Brands() {
  const [selectedBrands, setSelectedBrands] = useState({
    nike: false,
    adidas: false,
    puma: false,
    reebok: false,
    underArmour: false,
    newBalance: false,
    fila: false,
  });

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setSelectedBrands((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  return (
    <form className="brand-selection-form">
      <h2>Select Your Favorite Brands</h2>
      <div className="checkbox-group">
        {Object.keys(selectedBrands).map((brand) => (
          <label key={brand} className="checkbox-label">
            <input
              type="checkbox"
              name={brand}
              checked={selectedBrands[brand]}
              onChange={handleCheckboxChange}
            />
            {brand.charAt(0).toUpperCase() + brand.slice(1)}
          </label>
        ))}
      </div>
    </form>
  );
}

export default Brands;
