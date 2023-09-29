import React, { Fragment, useState } from "react";
import classes from "./Auth.module.css";


const Auth = () => {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredConfirmPassword, setEnteredConfirmPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    // console.log("Clicked");
    let url;
    // if (isLogin) {
    // } else {
    //   if (enteredPassword === enteredConfirmPassword) {
    //     url =
    //       "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBuyjguY7nc7Y8QJMP1I-lwBAngSvprsoA";
    //   } else {
    //     alert("Please put the correct password");
    //   }
    // }
    try {
      if (enteredPassword === enteredConfirmPassword) {
        url =
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBuyjguY7nc7Y8QJMP1I-lwBAngSvprsoA";
      } else {
        const passwordErr = "Please put the correct password.";
        throw new Error(passwordErr);
      }

      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (data.error && data.error.message === "EMAIL_EXISTS") {
        const emailExist =
          "Email already exists. Please use a diiferent email.";
        throw new Error(emailExist);
      } else if (
        data.error &&
        data.error.message === "TOO_MANY_ATTEMPTS_TRY_LATER"
      ) {
        const emailAttempts = "Try again later";
        throw new Error(emailAttempts);
      } else if (!response.ok) {
        throw new Error("Please try again");
      }

      console.log(data.idToken);
      localStorage.setItem("idToken", data.idToken);
    } catch (error) {
      setErrorMsg(error.message);
    } finally {
      setTimeout(() => {
        setErrorMsg("");
      }, 2000);
    }

    setEnteredEmail("");
    setEnteredPassword("");
    setEnteredConfirmPassword("");
  };

  const enteredEmailHandler = (e) => {
    setEnteredEmail(e.target.value);
    // console.log(e.target.value);
  };
  const enteredPasswordHandler = (e) => {
    setEnteredPassword(e.target.value);
  };
  const enteredConfirmPassHandler = (e) => {
    setEnteredConfirmPassword(e.target.value);
  };

  return (
    <section className={classes.authForm}>
      <h2>{isLogin ? "Welcome Again!" : "Welcome!"}</h2>
      <form onSubmit={submitHandler} className={classes.formstart}>
        {errorMsg && <span>{errorMsg}</span>}
        <input
          id="Email"
          type="email"
          placeholder="Enter your email.."
          value={enteredEmail}
          onChange={enteredEmailHandler}
          required
        />
        <input
          id="Password"
          type="password"
          placeholder="Enter your password.."
          value={enteredPassword}
          onChange={enteredPasswordHandler}
          required
        />
        {!isLogin && (
          <input
            id="Confirmpassword"
            type="password"
            placeholder="Confirm Password.."
            value={enteredConfirmPassword}
            onChange={enteredConfirmPassHandler}
            required
          />
        )}

        <button className={classes.btn} type="submit">{isLogin ? "Login" : "Signup"}</button>
        <button className={classes.switchBtn} onClick={switchAuthModeHandler}>
          {isLogin ? "Don't have an account? Signup" : "Have an account? Login"}
        </button>
      </form>
    </section>
  );
};

export default Auth;
