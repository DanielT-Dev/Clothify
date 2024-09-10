import React from 'react';
import { useClerk } from '@clerk/clerk-react';
import styles from "../styles/Settings.module.css";

const SignOut = () => {
  const { signOut } = useClerk();

  const handleLogout = async () => {
    try {
      await signOut();
      // Optionally redirect or show a success message
      window.location.href = '/sign-in'; // Or any other route
      alert('You have been logged out successfully.');
    } catch (error) {
      console.error('Logout error:', error);
      alert(`Logout error: ${error.message || 'Unknown error'}`);
    }
  };

  return (
    <button className={styles.adminButton} onClick={handleLogout}>Sign-Out</button>
  );
};

export default SignOut;
