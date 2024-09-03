import React from 'react';
import { useClerk } from '@clerk/clerk-react';

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
    <button style={{backgroundColor: "#E97777", color: "#FF9F9F", border: "none", padding: '3vw', fontWeight: "600", fontSize: "3vh", borderRadius: "10px"}} onClick={handleLogout}>Sign-Out</button>
  );
};

export default SignOut;
