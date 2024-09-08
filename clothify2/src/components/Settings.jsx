import React, { useEffect, useState } from 'react';
import Header from "./Header";
import SignOut from "./SignOut";
import styles from "../styles/Settings.module.css";
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
  const { user, isLoaded } = useUser(); // Check if user data is loaded
  const [isAdmin, setIsAdmin] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (isLoaded && user) {
      const emailAddress = user.primaryEmailAddress?.emailAddress?.trim().toLowerCase();
      if (emailAddress === "danieltrusca1@outlook.com") {
        setIsAdmin(true); // Set the isAdmin state if the email matches
      }
    }
  }, [isLoaded, user]);

  return (
    <div>
      <Header />
      <div className={styles.body}>
        <div className={styles.box}>
          <h1>Authentication Settings</h1>
          <SignOut />
        </div>

        {isAdmin && (
          <div className={styles.box}>
            <h1>Administrator Interface</h1>
            <button
              style={{
                backgroundColor: "#1FAB89",
                color: "#9DF3C4",
                border: "none",
                padding: '3vw',
                fontWeight: "600",
                fontSize: "3vh",
                borderRadius: "10px"
              }}
              onClick={() => navigate('/new_item')}
            >
              Add a new item
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;
