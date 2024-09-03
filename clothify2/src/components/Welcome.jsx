import React from 'react'

import styles from "../styles/Welcome.module.css"

const Welcome = () => {
  return (
    <div className={styles.container}>
        <div className={styles.body}>
            <img 
                src="/welcome2.png"
                className={styles.image}
            />
            <img 
                src="/logo2.png"
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