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
            <h1 className={styles.slogan}>
                <span>Clothify</span> - Where Fashion Meets Personality
            </h1>
        </div>
    </div>
  )
}

export default Welcome