import React from 'react';
import { useClerk } from '@clerk/clerk-react';

const SignOut = () => {
  const { signOut } = useClerk();

  const handleLogout = async () => {
    try {
      await signOut();
      // Optionally redirect or show a success message
      alert('You have been logged out successfully.');
    } catch (error) {
      console.error('Logout error:', error);
      alert(`Logout error: ${error.message || 'Unknown error'}`);
    }
  };

  return (
    <button onClick={handleLogout}>Log Out</button>
  );
};

export default SignOut;
