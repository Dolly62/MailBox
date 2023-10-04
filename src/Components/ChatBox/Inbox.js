import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { mailActions } from "../../Store/ComposeMails";
import classes from "./Inbox.module.css";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";

const Inbox = () => {
  const receivedMailmsg = useSelector(
    (state) => state.composeMail.receivedMailmsg
  );
  const email = useSelector((state) => state.auth.email);

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const dispatch = useDispatch();

  const MAX_CHARACTERS = 30;

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
        const unreadMails = allMails.filter((mail) => !mail.isRead);
        dispatch(mailActions.addReceivedMails({ receivedMailmsg: allMails }));
        dispatch(mailActions.updateUnreadMsgCount(unreadMails.length));
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

  const limitText = (text) => {
    if (text && text.length > MAX_CHARACTERS) {
      return text.substring(0, MAX_CHARACTERS) + "...";
    }
    return text;
  };

  // IS MESSAGE READ OR NOT HANDLER
  const readMsgHandler = async (msgName, isRead) => {
    const editEmail = email.replace(/[@.]/g, "");
    try {
      const response = await fetch(
        `https://mailbox-client-477fb-default-rtdb.firebaseio.com/composeMail/${editEmail}/${msgName}.json`,
        {
          method: "PATCH",
          body: JSON.stringify({
            isRead: true,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update");
      }

      const data = await response.json();
      console.log(data);
      dispatch(mailActions.markMsgAsRead({ msgName: msgName}));
      if (isRead) {
        dispatch(mailActions.updateUnreadMsgCount(-1));
      }
    } catch (error) {
      alert(error.message);
    }
  };

  //DELETE MAIL HANDLER
  const deleteMailHandler = async (name) => {
    const editEmail = email.replace(/[@.]/g, "");
    try {
      const response = await fetch(
        `https://mailbox-client-477fb-default-rtdb.firebaseio.com/composeMail/${editEmail}/${name}.json`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete a mail");
      }

      dispatch(mailActions.deleteMail(name));
    } catch (error) {}
  };

  return (
    <div className={classes.container}>
      {receivedMailmsg && receivedMailmsg.length > 0 ? (
        receivedMailmsg.map((mail) => (
          <Link
            to={`/inbox/${mail.name}`}
            key={mail.name}
            id={mail.name}
            className={classes.row}
            onClick={() => readMsgHandler(mail.name)}
          >
            {!mail.isRead && <span className={classes.blueDot}>•</span>}
            <div className={classes.col}>{mail.from}</div>
            <div className={classes.col}>
              {mail.composeSubject}
              <span style={{ color: "grey" }}>{limitText(mail.textArea)}</span>
            </div>
            <div className={classes.col}>{mail.atTime}</div>
            <button
              className={classes.dltebtn}
              onClick={() => deleteMailHandler(mail.name)}
            >
              <AiOutlineDelete />
            </button>
          </Link>
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
