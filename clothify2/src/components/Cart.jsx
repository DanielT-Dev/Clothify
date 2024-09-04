import React, { useEffect, useState } from 'react'
import styles from "../styles/Cart.module.css"

import Header from "./Header"

import { useUser } from '@clerk/clerk-react';

import { getDocumentByField } from '../lib/appwrite';

import { useIdeas } from "../lib/ideas";

const Cart = () => {

    const { user } = useUser();

    const [userDocument, setUserDocument] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const database_id = import.meta.env.VITE_APPWRITE_DATABASE_ID;
    const users_collection_id = import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID;

    const [ideas, setIdeas] = useState(null);
    const ideasData = useIdeas();

    useEffect(() => {
        // Update the state when `ideasData` changes
        setIdeas(ideasData);
    }, [ideasData]); // Dependency array ensures this runs when `ideasData` changes

    useEffect(() => {
        // Log the `ideas` state when it updates
        console.log('Updated ideas:', ideas);
    }, [ideas]); // Dependency array ensures this runs when `ideas` changes

    useEffect(() => {
        const handleGetDocument = async () => {
            setLoading(true);
            setError(null);
            try {
                const result = await getDocumentByField(
                    database_id, 
                    users_collection_id, 
                    'email', 
                    "danieltrusca1@outlook.com",
                );

                if (result) {
                    setUserDocument(result);
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

    if (!user || loading) {
        return <div>Loading...</div>;
    }


  return (
    <div className={styles.container}>
        <Header/>
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
            {
                ideas && ideas.current.filter((idea) => userDocument.cart.includes(idea.item_id)).map((idea) => (
                    <div 
                    key={idea.$id}
                    className={styles.box}
                    onClick={() => {
                        localStorage.setItem("current_item", JSON.stringify(idea));
                        navigate('/item');
                    }}
                    >
                        <div style={{width: "3vw"}}>
                        </div>
                        <div stlye={{display: "flex", flexDirection: "column", marginLeft: "3vw"}} className={styles.grid}>
                            <div className={styles.sale} style={{display: idea.sale[0] != "0" ? "block" : "none"}}>
                            <p style={{backgroundColor: "#E4CDA7", padding: "0.2vh", borderRadius: "10px"}}>
                                {idea.sale}
                            </p>
                            </div>
                            <div className={styles.sale} style={{backgroundColor: "transparent", fontWeight: "600", marginTop: idea.sale[0] != "0" ? "0vh" : "4.2vh"}}>
                            {idea.price}
                            </div>
                        </div>
                    <img src={idea.image_url} className={styles.item_image}/>
                    <h1>{idea.title}</h1>
                    <button>
                        <img src="/remove1.png"/>
                    </button>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default Cart