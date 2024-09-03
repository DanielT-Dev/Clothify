import React, { useState, useRef } from 'react';
import '../styles/Verification.css';

const Verification = ({ onSubmit, onClose }) => {
  const [code, setCode] = useState(new Array(6).fill(""));
  const inputsRef = useRef([]);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return;

    const newCode = [...code];
    newCode[index] = element.value;
    setCode(newCode);

    // Focus the next input field
    if (element.value !== "" && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleBackspace = (element, index) => {
    if (element.value === "" && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleResend = () => {
    // Logic to resend the verification code
    console.log("Resend code clicked");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(code.join(""));
  };

  return (
    <div className="verification-code-container">
      <button onClick={onClose} className="close-button">
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Menu / Close_MD"> <path id="Vector" d="M18 18L12 12M12 12L6 6M12 12L18 6M12 12L6 18" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g> </g></svg>
      </button>
      <p>Please insert the verification code to verify your account</p>
      <form onSubmit={handleSubmit}>
      <div className="verification-code-inputs">
        {code.map((digit, index) => (
          <input
            key={index}
            type="text"
            maxLength="1"
            value={digit}
            onChange={(e) => handleChange(e.target, index)}
            onKeyDown={(e) => e.key === "Backspace" && handleBackspace(e.target, index)}
            ref={(el) => (inputsRef.current[index] = el)}
          />
        ))}
      </div>
      <button type="submit">Verify</button>
      </form>
      <div style={{display: 'flex', flexDirection: "row", marginLeft: "2vw", marginTop: "2vh"}}>
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4.06189 13C4.02104 12.6724 4 12.3387 4 12C4 7.58172 7.58172 4 12 4C14.5006 4 16.7332 5.14727 18.2002 6.94416M19.9381 11C19.979 11.3276 20 11.6613 20 12C20 16.4183 16.4183 20 12 20C9.61061 20 7.46589 18.9525 6 17.2916M9 17H6V17.2916M18.2002 4V6.94416M18.2002 6.94416V6.99993L15.2002 7M6 20V17.2916" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
        <button onClick={handleResend} className="resend-button">
            Resend code
        </button>
      </div>
    </div>
  );
};

export default Verification;
