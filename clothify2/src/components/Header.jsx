import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styles from "../styles/Header.module.css"

import Modal from 'react-modal';

Modal.setAppElement('#root'); // Set the app element for accessibility (important for screen readers)

const Header = () => {
    const [showSearchModal, setShowSearchModal] = useState(false);
    const navigate = useNavigate();

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
                />     
                <div 
                    className={styles.user_circle}
                    onClick={() => navigate('/settings')}
                >
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
                        <input type="text"/>
                        <button>
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