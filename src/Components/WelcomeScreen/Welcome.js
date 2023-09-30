import React from 'react'
import welcomeImg from "../Images/welcome.png";
import classes from "./Welcome.module.css";

const Welcome = () => {
  return (
    <div className={classes.welcomeSrn}>
      <h1>Welcome To Your Mail Box!</h1>
      <img src={welcomeImg} alt='Welcome'/>
    </div>
  )
}

export default Welcome
