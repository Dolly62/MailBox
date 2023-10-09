import React from "react";
import classes from "./ForgetPass.module.css";
import { useHistory } from "react-router-dom";

const ForgetPass = () => {
  const history = useHistory();

  const forgetPasswordHandler = () => {
    history.push("/reset-password");
  };
  return (
    <button className={classes.forgetBtn} onClick={forgetPasswordHandler}>
      Forget Password ?
    </button>
  );
};

export default ForgetPass;
