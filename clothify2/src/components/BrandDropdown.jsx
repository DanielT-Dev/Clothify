import React, { useState } from 'react';
import '../styles/Dropdown.css'; // Optional CSS for styling

const BrandDropdown = () => {
  const [selectedBrands, setSelectedBrands] = useState({
    nike: false,
    adidas: false,
    puma: false,
    reebok: false,
    underArmour: false,
    newBalance: false,
    fila: false,
  });

  const handleChange = (event) => {
    const { name, checked } = event.target;
    setSelectedBrands({
      ...selectedBrands,
      [name]: checked,
    });
  };

  return (
    <div className="dropdown-container">
      <select id="brand-dropdown" multiple>
        {Object.keys(selectedBrands).map((brand) => (
          <option key={brand}>
            <input
              type="checkbox"
              name={brand}
              checked={selectedBrands[brand]}
              onChange={handleChange}
            />
            {brand.charAt(0).toUpperCase() + brand.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
};

export default BrandDropdown;
