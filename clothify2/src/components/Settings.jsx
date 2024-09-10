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
          <div style={{display: 'flex', flexDirection: "row"}}>
            <img src="/auth1.png"/>
            <h1>Authentication Settings</h1>
          </div>
          <SignOut />
        </div>

        {isAdmin && (
          <div className={styles.box}>
            <div style={{display: 'flex', flexDirection: "row"}}>
              <img src="/admin1.png"/>
              <h1>Administrator Interface</h1>
            </div>
            <button
              style={{
                backgroundColor: "#1FAB89",
                color: "#9DF3C4",
                border: "none",
                padding: '3vw',
                fontSize: "3vh",
                borderRadius: "10px"
              }}
              onClick={() => navigate('/new_item')}
            >
              Add a new item
            </button>
          </div>
        )}

          <div className={styles.box}>
            <div style={{display: 'flex', flexDirection: "row"}}>
              <img src="/bell1.png"/>
              <h1>News & Notfications</h1>
            </div>
            <button onClick={() => navigate('/newsletter')}>
              Newsletter
            </button>
          </div>

          <div className={styles.box}>
            <div style={{display: 'flex', flexDirection: "row"}}>
              <img src="/note1.png"/>
              <h1>Order History</h1>
            </div>
            <button>
              View History
            </button>
          </div>

          <div className={styles.box}>
            <div style={{display: 'flex', flexDirection: "row"}}>
              <img src="/map1.png"/>
              <h1>Order Tracking</h1>
            </div>
            <button>
              Live View
            </button>
          </div>
          <br/>
      </div>
    </div>
  );
};

export default Settings;
