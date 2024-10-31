import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Client, Databases } from 'appwrite';
import styles from '../styles/NewItem.module.css';

import Header from './Header';
import BrandDropdown from './BrandDropdown';

import { useUser } from '@clerk/clerk-react';

import Norification from "./Notification";

const client = new Client();
client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT); // Replace with your project ID

const databases = new Databases(client);

const NewItem = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  const [searchFilter, setSearchFilter] = useState(localStorage.getItem('searchFilter'));
  const [isCloth, setIsCloth] = useState(false);

  // Form state
  const [title, setTitle] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [price, setPrice] = useState('');
  const [sale, setSale] = useState('');
  const [brand, setBrand] = useState('');

  const [showNotification, setShowNotification] = useState(false);

  const handleToggle = () => {
    setIsCloth(!isCloth);
  };

  // Redirect if user email is not "danieltrusca1@outlook.com"
  useEffect(() => {
    if (user && user.primaryEmailAddress?.emailAddress?.trim().toLowerCase() !== 'danieltrusca1@outlook.com') {
      navigate('/'); // Redirect to the home page
    }
  }, [user, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {

      const listResponse = await databases.listDocuments(
        import.meta.env.VITE_APPWRITE_DATABASE_ID, // Your database ID
        import.meta.env.VITE_APPWRITE_COLLECTION_ID, // Your collection ID
      );
  
      // Step 2: Generate new ID as total documents + 1
      const newId = listResponse.total + 1;

      const response = await databases.createDocument(
        import.meta.env.VITE_APPWRITE_DATABASE_ID, // Your database ID
        import.meta.env.VITE_APPWRITE_COLLECTION_ID, // Your collection ID
        'unique()', // Document ID (use 'unique()' for auto-generated ID)
        {
          title,
          item_id: JSON.stringify(newId),
          image_url: imageURL,
          price,
          sale,
          brand,
          isCloth,
          priceId: "",
        }
      );
      console.log('Document created successfully:', response);
      // Handle successful document creation
      setShowNotification(true);
    } catch (error) {
      console.error('Error creating document:', error);
      // Handle errors
    }
  };

  return (
    <div className={styles.container}>
      <Header setSearchFilter={setSearchFilter} />
      <div className={styles.body}>
        <h1>Add a new item to Clothify</h1>
        <form onSubmit={handleSubmit} className={styles.box}>
          <p>Title</p>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required/>
          <p>Image URL</p>
          <input type="text" value={imageURL} onChange={(e) => setImageURL(e.target.value)} required/>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <p>
                Price
                <br />
                <span style={{ fontSize: '1.7vh' }}>
                  Must contain currency symbol (ex: $123)
                </span>
              </p>
              <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} className={styles.numericInput} required/>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <p>
                Sale
                <br />
                <span style={{ fontSize: '1.7vh' }}>
                  Must contain percentage symbol (ex: 50%)
                </span>
              </p>
              <input type="text" value={sale} onChange={(e) => setSale(e.target.value)} className={styles.numericInput} required/>
            </div>
          </div>
          <p>
            Brand
            <br />
            <span style={{ fontSize: '1.7vh' }}>
              Must select exactly one option
            </span>
          </p>
          <BrandDropdown value={brand} onChange={(e) => setBrand(e.target.value)} />
          <p>
            Cloth
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
                required
              />
              <span className={styles.slider}></span>
            </label>
            <span className={styles.status}>{isCloth ? 'Cloth' : 'Not cloth'}</span>
          </div>
          <button type="submit">Add Item</button>
        </form>
        {showNotification && (
            <Notification 
              message="Item added sucessfully." 
              onClose={() => setShowNotification(false)} 
            />
          )}
      </div>
    </div>
  );
};

export default NewItem;
