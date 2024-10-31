import React from 'react'

const VerificationBad = () => {
  return (
    <div>
        <h1 style={{textAlign: "center", fontSize: "3vh"}}>
          Verification Failed
        </h1>
        <img src="../../assets/verificationbad1.png" style={{width: "100%"}}/>
        <p style={{textAlign: "center", fontSize: "2vh"}}>
        We encountered an error while verifying your account
        </p>
        <a style={{borderBottom: "3px solid #C3B091", paddingBottom: "5px", fontSize: "2vh", width: "100%", textAlign: "center"}}>
          Try again
        </a>
    </div>
  )
}

export default VerificationBad