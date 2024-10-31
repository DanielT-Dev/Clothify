import React from 'react';
import styles from '../styles/Newsletter.module.css';
import Header from "./Header";

const Newsletter = () => {
  return (
    <>
        <Header/>
        <div className={styles.container}>
        <h2 className={styles.header}>Stay Updated with Our Newsletter!</h2>
        <p className={styles.content}>
            Subscribe to our newsletter to get the latest updates, exclusive offers,
            and much more. We promise not to spam your inbox!
        </p>
        <div className={styles.buttonWrapper}>
            <a href="/subscribe" className={styles.button}>
            Subscribe Now
            </a>
        </div>
        <footer className={styles.footer}>
            <p>
            If you no longer wish to receive emails, you can <a href="/unsubscribe">unsubscribe here</a>.
            </p>
            <p>© 2024 Clothify. All rights reserved.</p>
        </footer>
        </div>
    </>
  );
};

export default Newsletter;
