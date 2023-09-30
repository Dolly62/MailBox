import React, { useState } from "react";
import classes from "./ComposeMail.module.css";
import { useDispatch, useSelector } from "react-redux";
import { mailActions } from "../../Store/ComposeMails";
const ComposeMail = () => {
  const [composeEmail, setComposeEmail] = useState("");
  const [composeSubject, setComposeSubject] = useState("");
  const [textArea, setTextArea] = useState("");

  const dispatch = useDispatch();

  const emailId = useSelector((state) => state.auth.email);
  console.log(emailId);

  const composeEmailSubmitHandler = async (e) => {
    e.preventDefault();
    const editEmail = emailId.replace(/[@.]/g, "");
    const composeMailData = {
      composeEmail,
      composeSubject,
      textArea,
    };

    try {
      const response = await fetch(
        `https://mailbox-client-477fb-default-rtdb.firebaseio.com/composeMail/${editEmail}.json`,
        {
          method: "POST",
          body: JSON.stringify(composeMailData),
        }
      );

      const data = await response.json();
      if(!response.ok){
        const errorMailMsg = "Something went wrong.."
        throw new Error(errorMailMsg);
      }
      console.log(data);
      dispatch(mailActions.addMails({
        name: data.name,
        composeEmail,
        composeSubject,
        textArea,
      }))
    } catch (error) {
        alert(error.message)
    } finally{
        setComposeEmail("");
        setComposeSubject("");
        setTextArea("");
    }
  };

  const composeEmailHandler = (e) => {
    setComposeEmail(e.target.value);
    // console.log(e.target.value);
  };
  const composeSubjectHandler = (e) => {
    setComposeSubject(e.target.value);
  };
  const composeTextAreaHandler = (e) => {
    setTextArea(e.target.value);
  };

  return (
    <div className={classes.container}>
      <form onSubmit={composeEmailSubmitHandler}>
        <div className={classes.row1}>
          <label htmlFor="to">To</label>
          <input
            id="to"
            type="email"
            placeholder="Enter your email.."
            value={composeEmail}
            onChange={composeEmailHandler}
            required
          />
        </div>
        <div className={classes.row2}>
          <input
            id="subject"
            type="text"
            value={composeSubject}
            onChange={composeSubjectHandler}
            required
          />
        </div>

        <div className="row">
          <textarea
            id="subject"
            placeholder="Write something..."
            value={textArea}
            onChange={composeTextAreaHandler}
            style={{ height: "70vh" }}
          />
        </div>

        <div className="row">
          <button type="submit">Send</button>
        </div>
      </form>
    </div>
  );
};

export default ComposeMail;
