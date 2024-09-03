import React from 'react'

import styles from "../styles/SignIn.module.css"

const SignIn = () => {
  return (
    <div className={styles.container}>
        <div className={styles.body}>
            <img 
                src="../../assets/signin1.png"
                className={styles.image}
            />
            <h1 className={styles.slogan}>
              Sign-In to your account
            </h1>
            <div className={styles.box}>
                <h1>
                    Sign-In
                </h1>
                <div style={{display: 'flex', flexDirection: "row", width: "100%"}}>
                    <div style={{display: 'flex', flexDirection: "column", flex: "1"}}>
                        <h1 style={{fontSize: "2vh", textAlign: "left", marginLeft: "5%"}}>
                            Email
                        </h1>  
                        <input type="text" style={{fontSize: "2vh", marginLeft: "5%", width: "90%"}}/>
                    </div>
                </div>
                <div style={{display: 'flex', flexDirection: "row", width: "100%"}}>
                    <div style={{display: 'flex', flexDirection: "column", flex: "1"}}>
                        <h1 style={{fontSize: "2vh", textAlign: "left", marginLeft: "5%"}}>
                            Password
                        </h1>  
                        <input type="password" style={{fontSize: "2vh", marginLeft: "5%", width: "90%"}}/>
                    </div>
                </div>
                <p>
                    Don't have an account? <br/>
                    <span style={{color: "#C3B091"}}>Sign-Up</span> instead
                </p>
                <button className={styles.button}>
                    Submit
                </button>
            </div>
        </div>
    </div>
  )
}

export default SignIn