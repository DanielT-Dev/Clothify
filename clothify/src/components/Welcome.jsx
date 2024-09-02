import React from 'react'

import styles from "../styles/welcome.module.css"

const Welcome = () => {
  return (
    <div className={styles.container}>
        <div className={styles.body}>
            <img 
                src="../../assets/welcome2.png"
                className={styles.image}
            />
            <img 
                src="../../assets/logo2.png"
                className={styles.logo}
            />
            <h1 className={styles.slogan}>
                Where Fashion Meets Personality
            </h1>
            <button className={styles.button}>
              Start
            </button>
        </div>
    </div>
  )
}

export default Welcome