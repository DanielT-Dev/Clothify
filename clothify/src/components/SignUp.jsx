import React, { useState } from 'react'

import { useSignUp } from '@clerk/clerk-react';

import styles from "../styles/SignUp.module.css"

import Modal from 'react-modal';
import Verification from './Verification';
import VerificationGood from './VerificationGood';
import VerificationBad from './VerificationBad'

Modal.setAppElement('#root'); // Set the app element for accessibility (important for screen readers)

const SignUp = () => {
    const { signUp, isLoaded } = useSignUp();
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm_password, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    const [pendingVerification, setPendingVerification] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isGood, setIsGood] = useState(0);

    const handleSignUp = async (e) => {
        e.preventDefault();
    
        if (!isLoaded) return; // Ensure that Clerk is loaded before proceeding
    
        if (password !== confirm_password) {
            setError("The passwords do not match.");
            alert("The passwords do not match.")
            return;
        }

        try {
          // Step 1: Create the sign-up attempt
          const response = await signUp.create({
            emailAddress: email,
            password,
            firstName: first_name,
            lastName: last_name,
          });
    
          // Step 2: Send the verification email
          await signUp.prepareEmailAddressVerification();
    
          // Inform the user to check their email for the verification link
          setPendingVerification(true);
          setIsModalOpen(true);
          setError(null);
        } catch (err) {
            console.error('Sign-up error:', err);
        }
      };
    
      const handleVerification = async (code) => {
        try {
          // Complete the email verification with the code provided by the user
          await signUp.attemptEmailAddressVerification({ code });
    
          // Redirect or handle successful sign-up (e.g., navigate to a dashboard)
          console.log('Sign-up successful!');
          setIsGood(1);
          setIsModalOpen(false);
        } catch (err) {
          setError(err.errors ? err.errors[0].message : 'Invalid verification code.');
          setIsGood(-1);
          setIsModalOpen(false);
        }
    };
    

  return (
    <div className={styles.container}>
        <div className={styles.body}>
            <img 
                src="../../assets/signup1.png"
                className={styles.image}
            />
            <h1 className={styles.slogan}>
                Create A New Account
            </h1>
            <div className={styles.box}>
                <h1>
                    Sign-Up
                </h1>
                <div style={{display: 'flex', flexDirection: "row", width: "100%"}}>
                    <div style={{display: 'flex', flexDirection: "column", flex: "1"}}>
                        <h1 style={{fontSize: "2vh", textAlign: "left", marginLeft: "10%"}}>
                            First Name
                        </h1>  
                        <input 
                            type="text"
                            value={first_name}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        />
                    </div>
                    <div style={{display: 'flex', flexDirection: "column", flex: "1"}}>
                        <h1 style={{fontSize: "2vh", textAlign: "left", marginLeft: "10%"}}>
                            Last Name
                        </h1>  
                        <input 
                            type="text"
                            value={last_name}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div style={{display: 'flex', flexDirection: "row", width: "100%"}}>
                    <div style={{display: 'flex', flexDirection: "column", flex: "1"}}>
                        <h1 style={{fontSize: "2vh", textAlign: "left", marginLeft: "5%"}}>
                            Email
                        </h1>  
                        <input 
                            type="text" 
                            style={{fontSize: "2vh", marginLeft: "5%", width: "90%"}}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div style={{display: 'flex', flexDirection: "row", width: "100%"}}>
                    <div style={{display: 'flex', flexDirection: "column", flex: "1"}}>
                        <h1 style={{fontSize: "2vh", textAlign: "left", marginLeft: "5%"}}>
                            Password
                        </h1>  
                        <input 
                            type="password" 
                            style={{fontSize: "2vh", marginLeft: "5%", width: "90%"}}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div style={{display: 'flex', flexDirection: "row", width: "100%"}}>
                    <div style={{display: 'flex', flexDirection: "column", flex: "1"}}>
                        <h1 style={{fontSize: "2vh", textAlign: "left", marginLeft: "5%"}}>
                            Confirm Password
                        </h1>  
                        <input 
                            type="password" 
                            style={{fontSize: "2vh", marginLeft: "5%", width: "90%"}}
                            value={confirm_password}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <p>
                    Already have an account?
                    <span style={{color: "#C3B091"}}>Sign-In</span> instead
                </p>
                <button 
                    className={styles.button}
                    onClick={handleSignUp}
                >
                    Submit
                </button>
            </div>
            <Modal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                contentLabel="Verification Code"
                style={{
                    content: {
                        width: '70vw',
                        height: "33vh",
                        margin: 'auto',
                        textAlign: 'center',
                        borderRadius: '10px',
                    },
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    },
                }}
            >
                <Verification 
                    onSubmit={handleVerification} 
                    onClose={() => setIsModalOpen(false)} 
                />
            </Modal>
            <Modal
                isOpen={isGood == 1}
                onRequestClose={() => setIsGood(0)}
                style={{
                    content: {
                        width: '70vw',
                        height: "45vh",
                        margin: 'auto',
                        textAlign: 'center',
                        borderRadius: '10px',
                    },
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    },
                }}
            >
                <VerificationGood/>
            </Modal>
            <Modal
                isOpen={isGood == -1}
                onRequestClose={() => setIsGood(0)}
                style={{
                    content: {
                        width: '70vw',
                        height: "43vh",
                        margin: 'auto',
                        textAlign: 'center',
                        borderRadius: '10px',
                    },
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    },
                }}
            >
                <VerificationBad/>
            </Modal>
        </div>
    </div>
  )
}

export default SignUp