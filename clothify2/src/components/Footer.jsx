import React from 'react';
import '../styles/Footer.css'; // Import CSS for styling

function Footer() {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} Clothify. All rights reserved.</p>
      <div className="footer-links">
        <a href="/terms-and-conditions" target="_blank" rel="noopener noreferrer">Terms & Conditions</a>
        <span> | </span>
        <a href="/privacy-policy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
        <br/>
        <br/>
        <a href="/newsletter" rel="noopener noreferrer">Subscribe to Newsletter</a>
      </div>
    </footer>
  );
}

export default Footer;
