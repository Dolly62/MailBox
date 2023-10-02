import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { mailActions } from "../../Store/ComposeMails";
import classes from "./Sent.module.css";

const Sent = () => {
  const mailMsg = useSelector((state) => state.composeMail.sentMailMsg);
  const email = useSelector((state) => state.auth.email);
  console.log(email);
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const fetchfunctionHandler = async () => {
    const editEmail = email.replace(/[@.]/g, "");
    try {
      const response = await fetch(
        `https://mailbox-client-477fb-default-rtdb.firebaseio.com/composeMail/${editEmail}.json`
      );

      if (!response.ok) {
        throw new Error("Something gone wrong");
      }
      const data = await response.json();

      if (data !== null) {
        const allMails = Object.keys(data).map((key) => ({
          name: key,
          ...data[key],
        }));
        console.log(allMails);
        dispatch(mailActions.replaceMails({ sentMailMsg: allMails }));
      }
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchfunctionHandler();
    } else {
      dispatch(mailActions.clearAllMails());
    }
  }, [isLoggedIn]);

  return (
    <div className={classes.container}>
      {mailMsg && mailMsg.length > 0 ? (
        mailMsg.map((mail) => (
          <div key={mail.name} id={mail.id} className={classes.row}>
            <div className={classes.col}>
              To:<span>{mail.composeEmail}</span>
            </div>
            <div className={classes.col}>
              {mail.composeSubject}
              <span style={{ color: "grey" }}>{mail.textArea}</span>
            </div>
            <span className={classes.col}>{mail.atTime}</span>
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

export default Sent;
