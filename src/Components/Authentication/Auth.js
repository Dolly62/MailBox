import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import classes from "./Auth.module.css";
import ForgetPass from "./ForgetPass";
import { BiHide, BiShowAlt } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { authAction } from "../../Store/AuthReducer";

const Auth = () => {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredConfirmPassword, setEnteredConfirmPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();

  const history = useHistory();

  const showTextHandler = (e) => {
    //to prevent the default behaviour
    e.preventDefault();
    setShowPassword((prevState) => !prevState);
  };

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    // console.log("Clicked");
    let url;
    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBuyjguY7nc7Y8QJMP1I-lwBAngSvprsoA";
    } else {
      if (enteredPassword === enteredConfirmPassword) {
        url =
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBuyjguY7nc7Y8QJMP1I-lwBAngSvprsoA";
      } else {
        alert("Please put the correct password");
      }
    }
    try {
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
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error.message);
      } 
      const data = await response.json();
      // console.log(data.idToken);
      localStorage.setItem("idToken", data.idToken);
      localStorage.setItem("email", data.email);

      dispatch(
        authAction.login({
          token: localStorage.getItem("idToken"),
          email: localStorage.getItem("email"),
        })
      );

      // console.log(data.idToken);
      // console.log(data.email);

      history.push("/welcome");
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
        <div className={classes.inputContainer}>
          <input
            id="Password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password.."
            value={enteredPassword}
            onChange={enteredPasswordHandler}
            required
          />
          {isLogin && (
            <button onClick={showTextHandler}>
              {showPassword ? <BiHide /> : <BiShowAlt />}
            </button>
          )}
        </div>
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

        {isLogin && <ForgetPass />}

        <button className={classes.btn} type="submit">
          {isLogin ? "Login" : "Signup"}
        </button>
        <button className={classes.switchBtn} onClick={switchAuthModeHandler}>
          {isLogin ? "Don't have an account? Signup" : "Have an account? Login"}
        </button>
      </form>
    </section>
  );
};

export default Auth;
