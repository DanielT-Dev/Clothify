import React, { useEffect, useState } from 'react'
import styles from "../styles/Cart.module.css"

import Header from "./Header"

import { useUser } from '@clerk/clerk-react';

import { getDocumentByField, updateDocument } from '../lib/appwrite';

import { useIdeas } from "../lib/ideas";

import Notification from './Notification';
import { useNavigate } from 'react-router-dom';

const Cart = () => {

    const navigate = useNavigate();

    const { user } = useUser();
    const [userDocument, setUserDocument] = useState(null);
    const [documentId, setDocumentId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [ideas, setIdeas] = useState(null);
    const [total, setTotal] = useState(0);
    const [showNotification, setShowNotification] = useState(false);
    const [searchFilter, setSearchFilter] = useState("");

    useEffect(() => {
        localStorage.setItem("searchFilter", searchFilter);
    }, [searchFilter]);

    const database_id = import.meta.env.VITE_APPWRITE_DATABASE_ID;
    const users_collection_id = import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID;

    const ideasData = useIdeas();

    useEffect(() => {
        setIdeas(ideasData);
    }, [ideasData]);

    useEffect(() => {
        if (user) {
            const handleGetDocument = async () => {
                setLoading(true);
                setError(null);
                try {
                    const result = await getDocumentByField(
                        database_id,
                        users_collection_id,
                        'email',
                        user.emailAddresses[0].emailAddress
                    );

                    if (result) {
                        setUserDocument({
                            first_name: result.first_name,
                            last_name: result.last_name,
                            email: result.email,
                            cart: result.cart,
                        });
                        setDocumentId(result.$id);
                    } else {
                        setError('No document found with the specified field value.');
                    }
                } catch (error) {
                    setError('Error retrieving document: ' + error.message);
                } finally {
                    setLoading(false);
                }
            };

            handleGetDocument();
        }
    }, [user]);

    useEffect(() => {
        if (userDocument && ideas) {
            const totalPrice = ideas.current
                .filter((idea) => userDocument.cart.includes(idea.item_id))
                .reduce((accumulator, currentValue) => {
                    const numericValue = parseFloat(currentValue.price.replace(/[^0-9.-]+/g, ''));
                    return accumulator + numericValue;
                }, 0);

            setTotal(totalPrice);
        }
    }, [userDocument, ideas]);

    const handleShowNotification = () => {
        setShowNotification(true);
        setTimeout(() => {
          setShowNotification(false);
        }, 3000); // Automatically close after 3 seconds
      };


    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!user) {
        return <div>No user found.</div>;
    }


  return (
    <div className={styles.container}>
        <Header setSearchFilter={setSearchFilter}/>
        <div className={styles.body}>
            <div style={{display: "flex", flexDirection: "row"}}>
                <img 
                    src="icon_cart1.png"
                    style={{width: "10vw", height: "10vw", marginTop: "1.5vh", marginLeft:"7.5vw", marginRight: "3vw"}}
                />
                <h1 style={{fontSize: "3vh"}}>
                    {user.firstName}'s Shopping List
                </h1>
            </div>
            <h1 style={{fontSize: "2vh", marginLeft: "7.5vw"}}>
                Total Items: {ideas && ideas.current.filter((idea) => userDocument.cart.includes(idea.item_id)).length}
            </h1>
            <h1 style={{fontSize: "2vh", marginLeft: "7.5vw"}}>
                Total Price: ${total}
            </h1>
            {
                ideas && ideas.current.filter((idea) => userDocument.cart.includes(idea.item_id)).map((idea) => (
                    <div 
                    key={idea.$id}
                    className={styles.box}
                    >
                        <div style={{width: "3vw"}}>
                        </div>
                        <div stlye={{display: "flex", flexDirection: "column", marginLeft: "3vw"}} className={styles.grid}>
                            <div className={styles.sale} style={{display: idea.sale[0] != "0" ? "block" : "none"}}>
                            <p style={{backgroundColor: "#E4CDA7", padding: "0.2vh", borderRadius: "10px", fontSize: "1.75vh"}}>
                                {idea.sale}
                            </p>
                            </div>
                            <div className={styles.sale} style={{fontSize: "1.75vh", backgroundColor: "transparent", fontWeight: "600", marginTop: idea.sale[0] != "0" ? "0vh" : "4.4vh"}}>
                            {idea.price}
                            </div>
                        </div>
                    <img src={idea.image_url} className={styles.item_image} onClick={() => {localStorage.setItem("current_item", JSON.stringify(idea)); navigate("/item")}}/>
                    <h1>{idea.title}</h1>
                    <button onClick={() => {updateDocument(database_id, users_collection_id, documentId, {...userDocument, cart: userDocument.cart.filter(item => item !== idea.item_id)}); handleShowNotification();}}>
                        <img src="/remove1.png"/>
                    </button>
                    </div>
                ))
            }
        </div>
        <button className={styles.continue} onClick={() => navigate("/payment")}>
            Confirm Items & Continue to Payment
        </button>
        {   showNotification && (
            <Notification 
              message="Item removed from shopping list." 
              onClose={() => setShowNotification(false)} 
            />
          )}
    </div>
  )
}

export default Cart