import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import styles from '../styles/NewItem.module.css';

import Header from './Header';
import BrandDropdown from './BrandDropdown';

import { useUser } from '@clerk/clerk-react';

const NewItem = () => {
  const { user } = useUser();
  const navigate = useNavigate(); // Initialize useNavigate hook

  const [searchFilter, setSearchFilter] = useState(localStorage.getItem('searchFilter'));
  const [isCloth, setIsCloth] = useState(false);

  const handleToggle = () => {
    setIsCloth(!isCloth);
  };

  // Redirect if user email is not "danieltrusca1@outlook.com"
  useEffect(() => {
    if (user && user.primaryEmailAddress?.emailAddress?.trim().toLowerCase() !== 'danieltrusca1@outlook.com') {
      navigate('/'); // Redirect to the home page
    }
  }, [user, navigate]);

  return (
    <div className={styles.container}>
      <Header setSearchFilter={setSearchFilter} />
      <div className={styles.body}>
        <h1>Add a new item to Clothify</h1>
        <div className={styles.box}>
          <p>Title</p>
          <input type="text" />
          <p>Image URL</p>
          <input type="text" />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <p>
                Price
                <br />
                <span style={{ fontSize: '1.7vh' }}>
                  Must contain currency symbol (ex: $123)
                </span>
              </p>
              <input type="text" className={styles.numericInput} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <p>
                Sale
                <br />
                <span style={{ fontSize: '1.7vh' }}>
                  Must contain percentage symbol (ex: 50%)
                </span>
              </p>
              <input type="text" className={styles.numericInput} />
            </div>
          </div>
          <p>
            Brand
            <br />
            <span style={{ fontSize: '1.7vh' }}>
              Must select exactly one option
            </span>
          </p>
          <BrandDropdown />
          <p>
            Brand
            <br />
            <span style={{ fontSize: '1.7vh' }}>
              Whether or not the item is made of cloth
            </span>
          </p>
          <div className={styles.switchContainer}>
            <label className={styles.switch}>
              <input
                type="checkbox"
                checked={isCloth}
                onChange={handleToggle}
              />
              <span className={styles.slider}></span>
            </label>
            <span className={styles.status}>{isCloth ? 'Cloth' : 'Not cloth'}</span>
          </div>
          <button>Add Item</button>
        </div>
      </div>
    </div>
  );
};

export default NewItem;
