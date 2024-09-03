import React from 'react'
import { useNavigate } from 'react-router-dom';
import styles from "../styles/Header.module.css"

const Header = () => {

    const navigate = useNavigate();

  return (
    <div className={styles.container}>
        <div className={styles.body}>
            <img
                src="../../assets/logo2.png" 
                className={styles.logo}
            />
            <div style={{
                float: "right",
                display: "flex", 
                flexDirection: "row",
            }}>
                <img 
                    src="../../assets/icon_search1.png" 
                    className={styles.icon}
                />   
                <img 
                    src="../../assets/icon_cart1.png" 
                    className={styles.icon}
                />     
                <div 
                    className={styles.user_circle}
                    onClick={() => navigate('/settings')}
                >
                </div> 
            </div>
        </div>
    </div>
  )
}

export default Header