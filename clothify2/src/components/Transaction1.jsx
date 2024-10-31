import React from 'react';
import styles from '../styles/Transaction1.module.css'; // Import CSS module for styling

const Transaction1 = () => {
  return (
    <section className={styles.thankYouContainer}>
      <h1>Thank You for Your Purchase!</h1>
      <p>Your order has been placed successfully. We appreciate your business and hope you enjoy your purchase.</p>
      <p>You will receive a confirmation email shortly. If you have any questions, feel free to reach out to our support team.</p>
      <a href="/" className={styles.backToShopLink}>Back to Shop</a>
    </section>
  );
};

export default Transaction1;
