import React, { useState, useEffect } from "react";
import classes from "./ComposeMail.module.css";
import { useDispatch, useSelector } from "react-redux";
import { mailActions } from "../../Store/ComposeMails";

const ComposeMail = () => {
  const [composeEmail, setComposeEmail] = useState("");
  const [composeSubject, setComposeSubject] = useState("");
  const [textArea, setTextArea] = useState("");

  const [lastSentData, setLastSentData] = useState(null);

  const dispatch = useDispatch();

  const emailId = useSelector((state) => state.auth.email);
  // console.log(emailId);

  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth().toString().padStart(2, "0");
  // console.log(month);
  const day = date.getDate().toString().padStart(2, "0");
  // console.log(day);

  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  const formattedDate = `${day}-${month}-${year}`;
  const formattedTime = `${hours}:${minutes}`;
  // console.log(formattedDate);
  // console.log(formattedTime);

  const composeEmailSubmitHandler = async (e) => {
    e.preventDefault();
    const editEmail = emailId.replace(/[@.]/g, "");
    const editComposeEmail = composeEmail.replace(/[@.]/g, "");

    
    const composeMailData = {
      from: emailId,
      composeEmail,
      composeSubject,
      textArea,
      atDate: formattedDate,
      atTime: formattedTime,
    };

    try {
      const response = await fetch(
        `https://mailbox-client-477fb-default-rtdb.firebaseio.com/composeMail/${editComposeEmail}.json`,
        {
          method: "POST",
          body: JSON.stringify(composeMailData),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        const errorMailMsg = "Something went wrong..";
        throw new Error(errorMailMsg);
      }
      dispatch(
        mailActions.addSentMails({
          name: data.name,
          from: emailId,
          composeEmail,
          composeSubject,
          textArea,
          atDate: formattedDate,
          atTime: formattedTime,
        })
      );
      alert("Sent successfully");
    } catch (error) {
      alert(error.message);
    } finally {
      setComposeEmail("");
      setComposeSubject("");
      setTextArea("");
    }
  };

  // const fetchMailData = async () => {
  //   const editEmail = emailId.replace(/[@.]/g, "");
  //   try {
  //     const response = await fetch(
  //       `https://mailbox-client-477fb-default-rtdb.firebaseio.com/composeMail/${editEmail}.json`
  //     );

  //     if (!response.ok) {
  //       const errorMsg = "Something went wrong";
  //       throw new Error(errorMsg);
  //     }

  //     const data = await response.json();
  //     // console.log(data);
  //     if (data) {
  //       const keyys = Object.keys(data);
  //       const latestMailKey = keyys[0];
  //       const extractedData = data[latestMailKey];
  //       setLastSentData(extractedData);
  //       // console.log(extractedData);
  //     } else {
  //       setLastSentData(null);
  //     }
  //   } catch (error) {
  //     alert(error.message);
  //   }
  // };

  // useEffect(() => {
  //   fetchMailData();
  // }, []);

  // useEffect(() => {
  //   // console.log(lastSentData);
  //   if (lastSentData) {
  //     setComposeEmail(lastSentData.composeEmail);
  //     setComposeSubject(lastSentData.composeSubject);
  //     setTextArea(lastSentData.textArea);
  //   }
  // }, [lastSentData]);

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
        <div className={classes.row}>
          <label htmlFor="to" style={{ fontWeight: "bold" }}>
            To:
          </label>
          <input
            id="to"
            type="email"
            placeholder="Enter your email.."
            value={composeEmail}
            onChange={composeEmailHandler}
            required
          />
        </div>
        <div className={classes.row}>
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
            style={{ height: "60vh" }}
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
