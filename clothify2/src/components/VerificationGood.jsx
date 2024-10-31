import React from 'react'

const VerificationGood = () => {
  return (
    <div>
        <h1 style={{textAlign: "center", fontSize: "3vh"}}>
            Your Account Has Been Verified
        </h1>
        <img src="/verificationgood1.png" style={{width: "100%"}}/>
        <a href="/home" style={{borderBottom: "3px solid #C3B091", paddingBottom: "5px", fontSize: "2vh", width: "100%", textAlign: "center"}}>
            Continue to Home
        </a>
    </div>
  )
}

export default VerificationGood