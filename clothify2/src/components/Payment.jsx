import React, { useState, useEffect } from "react";
import styles from "../styles/Payment.module.css"; // Import the CSS module

import { useUser } from '@clerk/clerk-react';

import axios from "axios";

import { getDocumentByField, updateDocument } from '../lib/appwrite';

const ProductDisplay = ({ total, userId }) => {
  const handleCheckout = async () => {
    try {
      const response = await axios.post('http://localhost:4242/create-checkout-session', {
        userId, // Include userId or any other necessary data
      });
  
      if (response.status === 200) {
        const { url } = response.data; // Extract the URL from the response
        window.location.href = url; // Redirect the user to Stripe Checkout
      } else {
        console.error('Failed to create checkout session');
      }
    } catch (error) {
      console.error('Error during checkout:', error);
    }
  };

  return (
    <section>
      <div className={styles.product}>
        <img src="/cart1.png" alt="The cover of Stubborn Attachments" />
        <div className={styles.description}>
          <h3>Shopping List</h3>
          <h5>Total price: ${total}</h5>
        </div>
      </div>
      <button onClick={handleCheckout}>Checkout</button>
    </section>
  );
};

const Message = ({ message }) => (
  <section>
    <p>{message}</p>
  </section>
);

export default function Payment() {

  const database_id = import.meta.env.VITE_APPWRITE_DATABASE_ID;
  const users_collection_id = import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [userDocument, setUserDocument] = useState(null);
  const [documentId, setDocumentId] = useState(null);

  const [message, setMessage] = useState("");

  const total = localStorage.getItem("total_price");

  const { user } = useUser();

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      setMessage("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, []);

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

  if (!user) {
      return <div>No user found.</div>;
  }

  if (loading) {
      return <div>Loading...</div>;
  }

  if (error) {
      return <div>{error}</div>;
  }

  if (!documentId) {
      return <div>Loading document...</div>; // or some other placeholder
  }

  return message ? (
    <Message message={message} />
  ) : (
    <ProductDisplay total={total} userId={documentId}/>
  );
}
