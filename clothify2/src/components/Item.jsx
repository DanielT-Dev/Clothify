import React, { useEffect, useState } from 'react'

import Header from "./Header"

import styles from "../styles/Item.module.css";
import { useNavigate } from 'react-router-dom';
import { getDocumentByField, updateDocument } from '../lib/appwrite';

import { useUser } from '@clerk/clerk-react';
import Notification from './Notification';

const Item = () => {
    const item = JSON.parse(localStorage.getItem("current_item"));

    const navigate = useNavigate();

    const database_id = import.meta.env.VITE_APPWRITE_DATABASE_ID;
    const users_collection_id = import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID;

    const { user } = useUser();

    if (!user) {
        return <p>Loading...</p>;
      }

    const [userDocument, setUserDocument] = useState();
    const [documentId, setDocumentId] = useState();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const handleGetDocument = async () => {
            setLoading(true);
            setError(null);
            try {
                const result = await getDocumentByField(
                    database_id, 
                    users_collection_id, 
                    'email', 
                    user.emailAddresses[0].emailAddress,
                );

                if (result) {
                    setUserDocument({
                        first_name: result.first_name,
                        last_name: result.last_name,
                        email: result.email,
                        cart: result.cart,
                    });
                    setDocumentId(result.$id);
                    setLoading(false);
                } else {
                    setError('No document found with the specified field value.');
                }
            } catch (error) {
                setError('Error retrieving document: ' + error.message);
            } finally {
                setLoading(false);
            }
        }

        handleGetDocument();
    }, [database_id, users_collection_id])

    const [showNotification, setShowNotification] = useState(false);

    const handleShowNotification = () => {
        setShowNotification(true);
        setTimeout(() => {
          setShowNotification(false);
        }, 3000); // Automatically close after 3 seconds
      };

    if (!user || loading) {
        return <div>Loading...</div>;
    }

  return (
    <div className={styles.container}>
        <Header/>
        <div className={styles.body}>
            <div className={styles.box}>
                <img 
                    src="/back3.png"
                    className={styles.back}
                    onClick={() => navigate('/home')}
                />
                <img src={item.image_url}/>
                <img 
                    src="/icon_cart2.png"
                    className={styles.cart}
                    onClick={() => {updateDocument(database_id, users_collection_id, documentId, {...userDocument, cart: [...userDocument.cart, item.item_id]}); handleShowNotification();}}
                />
            </div>
            <h1>
                {   
                    item.sale[0] != "0" &&
                    <span>{item.sale} SALE</span>
                }
                 {item.price}
            </h1>
            <h1>
                {item.title}
            </h1>
            <button style={{display: "flex", flexDirection: "row"}}>
                <img 
                    src="/dropdown1.png"
                />
                <p>
                    Choose Size
                </p>
            </button>
        </div>
        {   showNotification && (
            <Notification 
              message="Item added to shopping list." 
              onClose={() => setShowNotification(false)} 
            />
          )}
    </div>
  )
}

export default Item