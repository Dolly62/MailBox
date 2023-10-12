import React from "react";
import { useState } from "react";
import classes from "./ResetPass.module.css";
import { useHistory } from "react-router-dom";

const ResetPass = () => {
  const [emailForPassword, setEmailForPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmail] = useState(false);

  const history = useHistory();

  const resetPasswordHandler = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCASb28ElCQEKerlpRr_iRzZ6mFyvyruOQ",
        {
          method: "POST",
          body: JSON.stringify({
            requestType: "PASSWORD_RESET",
            email: emailForPassword,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to reset your password");
      }

      setIsEmail(true);
      const data = await response.json();
      // console.log(data.email);
    } catch (error) {
      alert(error.message);
    } finally {
      setIsLoading(false);
      history.push("/login")
    }
  };

  return (
    <section className={classes.container}>
      <h2>Reset your Password</h2>
      {isEmailSent ? (
        <p>Password reset email sent. Please check your email inbox.</p>
      ) : (
        <>
          <p>Enter the email with which you have registered:</p>
          <input
            type="email"
            id="Email"
            placeholder="Enter your email.."
            value={emailForPassword}
            onChange={(e) => setEmailForPassword(e.target.value)}
            required
          />
          <button onClick={resetPasswordHandler} disabled={isLoading}>
            {isLoading ? "Sending..." : "Send Link"}
          </button>
        </>
      )}
    </section>
  );
};

export default ResetPass;
