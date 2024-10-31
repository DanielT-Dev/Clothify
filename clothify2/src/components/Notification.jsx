import React, { useState, useEffect } from 'react';
import '../styles/Notification.css'; // Import CSS for styling

function Notification({ message, onClose }) {
  const show = true;
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (show) {
      setIsVisible(true);
    }
  }, [show]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300); // Match timeout with animation duration
  };

  return (
    isVisible && (
      <div className={`notification ${show ? 'slide-in' : ''}`}>
        <p>{message}</p>
        <button onClick={handleClose}>Close</button>
      </div>
    )
  );
}

export default Notification;
