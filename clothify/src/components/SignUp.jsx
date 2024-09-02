import React from 'react'

import styles from "../styles/SignUp.module.css"

const Welcome = () => {
  return (
    <div className={styles.container}>
        <div className={styles.body}>
            <img 
                src="../../assets/signup1.png"
                className={styles.image}
            />
            <h1 className={styles.slogan}>
                Create A New Account
            </h1>
            <div className={styles.box}>
                <h1>
                    Sign-Up
                </h1>
                <div style={{display: 'flex', flexDirection: "row", width: "100%"}}>
                    <div style={{display: 'flex', flexDirection: "column", flex: "1"}}>
                        <h1 style={{fontSize: "2vh", textAlign: "left", marginLeft: "10%"}}>
                            First Name
                        </h1>  
                        <input type="text"/>
                    </div>
                    <div style={{display: 'flex', flexDirection: "column", flex: "1"}}>
                        <h1 style={{fontSize: "2vh", textAlign: "left", marginLeft: "10%"}}>
                            Last Name
                        </h1>  
                        <input type="text"/>
                    </div>
                </div>
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
                <div style={{display: 'flex', flexDirection: "row", width: "100%"}}>
                    <div style={{display: 'flex', flexDirection: "column", flex: "1"}}>
                        <h1 style={{fontSize: "2vh", textAlign: "left", marginLeft: "5%"}}>
                            Confirm Password
                        </h1>  
                        <input type="password" style={{fontSize: "2vh", marginLeft: "5%", width: "90%"}}/>
                    </div>
                </div>
                <p>
                    Already have an account?
                    <span style={{color: "#C3B091"}}>Sign-In</span> instead
                </p>
                <button className={styles.button}>
                    Submit
                </button>
            </div>
        </div>
    </div>
  )
}

export default Welcome