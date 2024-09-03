import React from 'react'
import Header from "./Header"

import SignOut from "./SignOut";

import styles from "../styles/Settings.module.css"

const Settings = () => {
  return (
    <div>
      <Header/>
      <div className={styles.body}>
        <div className={styles.box}>
          <h1>
            Authentication Settings
          </h1>
          <SignOut/>
        </div>
      </div>
    </div>
  )
}

export default Settings