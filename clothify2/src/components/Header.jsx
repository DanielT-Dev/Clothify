import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styles from "../styles/Header.module.css"

import Modal from 'react-modal';

Modal.setAppElement('#root'); // Set the app element for accessibility (important for screen readers)

import { useUser } from '@clerk/clerk-react';

const Header = ({setSearchFilter}) => {
    const [showSearchModal, setShowSearchModal] = useState(false);
    const navigate = useNavigate();

    const { user } = useUser();

    const [query, setQuery] = useState("");

    const handleSearch = () => {
        setSearchFilter(query);
        localStorage.setItem('searchFilter', query);
        navigate('/home');
    }

    if (!user) {
        return <div>Loading...</div>;
    }

  return ( 
    <div className={styles.container}>
        <div className={styles.body}>
            <img
                src="/logo2.png" 
                className={styles.logo}
                onClick={() => navigate('/home')}
            />
            <div style={{
                float: "right",
                display: "flex", 
                flexDirection: "row",
            }}>
                <img 
                    src="/icon_search1.png" 
                    className={styles.icon}
                    onClick={() => setShowSearchModal(true)}
                />   
                <img 
                    src="/icon_cart1.png" 
                    className={styles.icon}
                    onClick={() => navigate('/cart')}
                />     
                <div 
                    className={styles.user_circle}
                    onClick={() => navigate('/settings')}
                    style={{textAlign: "center", fontSize: "4vh", fontWeight:"600", alignItems: "center", justifyContent: "center", display: "flex"}}
                >
                    <p style={{marginTop: "4.75vh"}}>
                        {user.firstName[0]}
                    </p>
                </div> 
            </div>
            <Modal
                isOpen={showSearchModal}
                onRequestClose={() => setShowSearchModal(false)}
                style={{
                    content: {
                        width: '70vw',
                        height: "18vh",
                        margin: 'auto',
                        textAlign: 'center',
                        borderRadius: '10px',
                    },
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    },
                }}
            >
                <div className={styles.search}>
                    <div style={{display: "flex", flexDirection: "row"}}>
                        <img 
                            src="/icon_search1.png" 
                            className={styles.icon}
                        />   
                        <h1 style={{fontSize: "2.5vh", paddingTop: "1vh"}}>
                            Search for an item
                        </h1>
                    </div>
                    <div style={{display: "flex", flexDirection: "row"}}>
                        <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} autoFocus/>
                        <button onClick={handleSearch}>
                            <img 
                                src="/ok2.png" 
                                className={styles.icon}
                            />  
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    </div>
  )
}

export default Header