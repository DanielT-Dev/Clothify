import React, { useEffect, useState } from 'react'

import Header from "./Header"

import styles from "../styles/Item.module.css";
import { useNavigate } from 'react-router-dom';
import { getDocumentByField, updateDocument } from '../lib/appwrite';

import { useUser } from '@clerk/clerk-react';
import Notification from './Notification';

import Modal from 'react-modal';
import AddReviewModal from './AddReviewModal';

Modal.setAppElement('#root');

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

    const [showReviewModal, setShowReviewModal] = useState(false);

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

      // Shoe sizes: 36 to 46
    const shoeSizes = Array.from({ length: 11 }, (_, i) => 36 + i); // Creates an array [36, 37, ..., 46]

    // Clothing sizes: S, M, L, XL, XXL
    const clothingSizes = ['S', 'M', 'L', 'XL', 'XXL'];

    const [showSizes, setShowSizes] = useState(false);

    const closeModal = () => {
        setShowReviewModal(false);
      };
    
      // Function to handle form submission
      const handleReviewSubmit = (reviewData) => {
        // Process the review data (e.g., send to a server or update state)
        console.log('Review submitted:', reviewData);
        // Close the modal after submission
        closeModal();
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
                <div style={{display: "flex", flexDirection: "row", marginLeft: "28vw", width: "33vw", alignItems: window.innerWidth >= 600 ? "left" : "center", justifyContent: window.innerWidth >= 600 ? "left" : "center"}}>
                    <p>
                        {item.price}
                    </p>
                    {
                        item.sale[0] != "0" &&
                        <p style={{marginLeft: "3vw", textDecoration: "line-through", textDecorationStyle: "double"}}>
                            ${(parseFloat(item.price.replace('$', ''))/(1-parseFloat(item.sale.replace('%', ''))/100))}
                        </p>
                    }
                </div>
                 
            </h1>
            <h1>
                {item.title}
            </h1>
            <button 
                style={{display: "flex", flexDirection: "row"}} 
                onClick={() => setShowSizes(!showSizes)}
            >
                {
                    !showSizes
                    ? <img 
                        src="/dropdown1.png"

                    />
                    : <img 
                        src="/up1.png"
                        style={{scale: "0.7"}}
                    />
                }
                <p>
                    Choose Size
                </p>
            </button>
            {
                showSizes &&
                <div>
                    {
                        !item.isCloth &&
                        <ul>
                            {shoeSizes.map((size) => (
                            <li key={size}> {size}</li>
                            ))}
                        </ul>
                    }
                    {
                        item.isCloth &&
                        <ul>
                        {clothingSizes.map((size) => (
                        <li key={size}>{size}</li>
                        ))}
                    </ul>
                    }
                </div>
            }
            <div className={styles.box}>
                <h1>
                    Reviews
                </h1>
                <button 
                    className={styles.add_review} 
                    onClick={() => setShowReviewModal(true)}
                >
                    Add Review
                </button>
                <div className={styles.review}>
                    <div style={{display: "flex" ,flexDirection: "row"}}>
                        <div className={styles.review_user} style={{textAlign: "center", fontSize: "4vh", fontWeight:"600", alignItems: "center", justifyContent: "center", display: "flex"}}>
                            A
                        </div>
                        <div style={{display: "flex" ,flexDirection: "column"}}>
                            <p className={styles.user}>
                                Alex Popescu
                            </p>
                            <div className={styles.rating}>
                                Rating: ★★★★☆ (4/5)
                            </div>
                        </div>
                        
                    </div>
                    
                    <p>
                        9 September 2024
                    </p>

                    <h1>
                    Great Quality, But Runs Slightly Small
                    </h1>
                    <p>
                    I bought this t-shirt a week ago and I absolutely love the fabric. It's soft, breathable, and holds up well after washing. The black color hasn’t faded at all, which is a huge plus for me.

                    However, the fit is a little tighter than I expected, especially around the shoulders. I usually wear a Medium, but I think I’ll go for a Large next time for a more relaxed fit.

                    Overall, it's a great wardrobe staple, just consider sizing up if you prefer a looser fit.
                    </p>
                    <br/>
                </div>
            </div>
            <br/>
        </div>
        
        <AddReviewModal
            isOpen={showReviewModal}
            onClose={closeModal} 
            onSubmit={handleReviewSubmit}
        />
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