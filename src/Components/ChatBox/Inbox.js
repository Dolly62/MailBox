import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { mailActions } from "../../Store/ComposeMails";
import classes from "./Inbox.module.css";

const Inbox = () => {
  const receivedMailmsg = useSelector((state) => state.composeMail.sentMailMsg);
  const email = useSelector((state) => state.auth.email);

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const dispatch = useDispatch();

  const fetchMailDataForInbox = async () => {
    const editEmail = email.replace(/[@.]/g, "");
    try {
      const response = await fetch(
        `https://mailbox-client-477fb-default-rtdb.firebaseio.com/composeMail/${editEmail}.json`
      );

      if (!response.ok) {
        const errmsg = "Something went wrong";
        throw new Error(errmsg);
      }
      const data = await response.json();
      // console.log(data);

      if (data) {
        const allMails = Object.keys(data).map((key) => ({
          name: key,
          ...data[key],
        }));
        // console.log(allMails);
        dispatch(mailActions.replaceMails({ MailMsg: allMails }));
      }
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchMailDataForInbox();
    } else {
      dispatch(mailActions.clearAllMails());
    }
  }, [isLoggedIn]);

  return (
    <div className={classes.container}>
      {receivedMailmsg && receivedMailmsg.length > 0 ? (
        receivedMailmsg.map((mail) => (
          <div key={mail.name} id={mail.name} className={classes.row}>
            <div className={classes.col}>{mail.from}</div>
            <div className={classes.col}>
              {mail.composeSubject}
              <span style={{ color: "grey" }}>{mail.textArea}</span>
            </div>
            <div className={classes.col}>{mail.atTime}</div>
          </div>
        ))
      ) : (
        <div className={classes.row}>
          <div style={{ margin: "2px auto" }}>No mail is found</div>
        </div>
      )}
    </div>
  );
};

export default Inbox;
