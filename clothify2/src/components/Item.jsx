import React, { useEffect, useState } from 'react'

import Header from "./Header"

import styles from "../styles/Item.module.css";
import { useNavigate } from 'react-router-dom';
import { getAllDocuments, getDocumentByField, updateDocument } from '../lib/appwrite';

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
    const reviews_collection_id = import.meta.env.VITE_APPWRITE_REVIEWS_COLLECTION_ID;

    const { user } = useUser();

    if (!user) {
        return <p>Loading...</p>;
      }

    const [userDocument, setUserDocument] = useState();
    const [documentId, setDocumentId] = useState();
    const [reviews, setReviews] = useState();

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

                const reviews = await getAllDocuments(
                    database_id,
                    reviews_collection_id,
                )

                if (result) {
                    setUserDocument({
                        first_name: result.first_name,
                        last_name: result.last_name,
                        email: result.email,
                        cart: result.cart,
                    });
                    setDocumentId(result.$id);
                    setReviews(reviews.map((r) => ({
                        review_id: r.review_id,
                        author_id: r.author_id,
                        rating: r.rating,
                        title: r.title,
                        content: r.content,
                        recommend: r.recommend,
                        date: r.date,
                        author_name: r.author_name,
                        item_id: r.item_id,
                    })));
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
                <div style={{marginBottom: "0", display: "flex", flexDirection: "row", marginLeft: "28vw", width: "33vw", alignItems: window.innerWidth >= 600 ? "left" : "center", justifyContent: window.innerWidth >= 600 ? "left" : "center"}}>
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
                <h2>
                    Choose Size
                </h2>
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
                {
                    reviews && reviews.filter((review) => review.item_id == JSON.parse(localStorage.getItem("current_item")).item_id).map((review) => {
                        return (<div className={styles.review}>
                    <div style={{display: "flex" ,flexDirection: "row"}}>
                        <div className={styles.review_user} style={{textAlign: "center", fontSize: "4vh", fontWeight:"600", alignItems: "center", justifyContent: "center", display: "flex"}}>
                            <span style={{marginTop: "0.5vh", background: "transparent"}}>
                                {review.author_name[0]}
                            </span>
                        </div>
                        <div style={{display: "flex" ,flexDirection: "column"}}>
                            <p className={styles.user}>
                                {review.author_name}
                            </p>
                            <div className={styles.rating}>
                                Rating: { '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating) } ({review.rating}/5)
                            </div>
                        </div>
                        
                    </div>
                    
                    <p style={{marginBottom: "0"}}>
                        {review.date}
                    </p>

                    <h1>
                    {review.title}
                    </h1>
                    <p>
                    {review.content}
                    </p>
                    <br/>
                </div>)
                    })
                }
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