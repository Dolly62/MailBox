import React, { Fragment, useState } from "react";
import { Button, Form } from "react-bootstrap";

const Auth = () => {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredConfirmPassword, setEnteredConfirmPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);

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
      }else{
        alert("Please put the correct password");
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
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error.message);
      }
      const data = await response.json();
      console.log(data.idToken);
    } catch (error) {
      alert(error.message);
    } finally {
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
    <Fragment>
      <h2>Form</h2>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3">
          <Form.Control
            size="lg"
            id="Email"
            type="email"
            placeholder="Enter your email.."
            value={enteredEmail}
            onChange={enteredEmailHandler}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            size="lg"
            id="Password"
            type="password"
            placeholder="Enter your password.."
            value={enteredPassword}
            onChange={enteredPasswordHandler}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            size="lg"
            id="Confirmpassword"
            type="password"
            placeholder="Confirm Password.."
            value={enteredConfirmPassword}
            onChange={enteredConfirmPassHandler}
            required
          />
        </Form.Group>
        <Button type="submit">SignUp</Button>
        <Button>Have an account? LogIn</Button>
      </Form>
    </Fragment>
  );
};

export default Auth;
