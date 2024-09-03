import React from 'react'

import Header from "./Header"

import styles from "../styles/Item.module.css";
import { useNavigate } from 'react-router-dom';

const Item = () => {
    const item = JSON.parse(localStorage.getItem("current_item"));

    const navigate = useNavigate();

  return (
    <div className={styles.container}>
        <Header/>
        <div className={styles.body}>
            <div className={styles.box}>
                <img 
                    src="/back3.png"
                    className={styles.back}
                    onClick={() => navigate('/home')}
                />
                <img src={item.image_url}/>
                <img 
                    src="/icon_cart2.png"
                    className={styles.cart}
                />
            </div>
            <h1>
                <span>{item.sale} SALE</span> {item.price}
            </h1>
            <h1>
                {item.title}
            </h1>
            <button style={{display: "flex", flexDirection: "row"}}>
                <img 
                    src="/dropdown1.png"
                />
                <p>
                    Choose Size
                </p>
            </button>
        </div>
    </div>
  )
}

export default Item