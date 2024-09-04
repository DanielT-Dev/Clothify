import React, { useState } from 'react';
import '../styles/Notification.css'; // Import CSS for styling

function Notification({ message, onClose }) {
  return (
    <div className="notification">
      <p>{message}</p>
      <button onClick={onClose}>Close</button>
    </div>
  );
}

export default Notification;
