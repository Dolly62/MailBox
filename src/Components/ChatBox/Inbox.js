import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { mailActions } from "../../Store/ComposeMails";
import classes from "./Inbox.module.css";
import { AiOutlineDelete } from "react-icons/ai";
import { GoUnread, GoRead } from "react-icons/go";
import { useHistory } from "react-router-dom";
import { fetchMailData } from "../../Store/mailActionCreator";

const Inbox = () => {
  const receivedMailmsg = useSelector(
    (state) => state.composeMail.receivedMailmsg
  );

  const email = useSelector((state) => state.auth.email);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const dispatch = useDispatch();

  const history = useHistory();

  const MAX_CHARACTERS = 30;

  //--------------------------------------------------LIMIT SET------------------------------------------------//

  const limitText = (text) => {
    if (text && text.length > MAX_CHARACTERS) {
      return text.substring(0, MAX_CHARACTERS) + "...";
    }
    return text;
  };

  //------------------------------------------------ FETCH DATA-----------------------------------------------//

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchMailData());
    } else {
      dispatch(mailActions.clearAllMails());
    }
  }, [dispatch]);

  //----------------------------------------------- IS MESSAGE READ OR NOT HANDLER---------------------------------------//
  const readMsgHandler = async (msgName, isRead) => {
    const editEmail = email.replace(/[@.]/g, "");
    try {
      const response = await fetch(
        `https://mailbox-client-477fb-default-rtdb.firebaseio.com/composeMail/${editEmail}/inbox/${msgName}.json`,
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
      // console.log(data.isRead);

      dispatch(
        mailActions.markMsgAsRead({ msgName: msgName, isRead: data.isRead })
      );
      if (isRead) {
        dispatch(mailActions.updateUnreadMsgCount(-1));
      }
      history.push(`/inbox/${msgName}`);
    } catch (error) {
      alert(error.message);
    }
  };

  //---------------------------------------------DELETE MAIL HANDLER-------------------------------//
  const deleteMailHandler = async (name) => {
    const editEmail = email.replace(/[@.]/g, "");
    try {
      const response = await fetch(
        `https://mailbox-client-477fb-default-rtdb.firebaseio.com/composeMail/${editEmail}/inbox/${name}.json`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete a mail");
      }

      dispatch(mailActions.deleteMail(name));
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className={classes.container}>
      {receivedMailmsg && receivedMailmsg.length > 0 ? (
        receivedMailmsg.map((mail) => (
          <div
            key={mail.name}
            id={mail.name}
            className={classes.row}
            onClick={() => {
              readMsgHandler(mail.name);
            }}
          >
            {!mail.isRead && <span style={{ color: "red" }}>•</span>}
            <div className={classes.col}>{mail.from}</div>
            <div className={classes.col}>
              {mail.composeSubject}
              <span style={{ color: "grey" }}>{limitText(mail.textArea)}</span>
            </div>
            <div className={classes.col}>
              <span>{mail.atTime}</span>
              <span> {mail.atDate}</span>
            </div>
            <button className={classes.btn} style={{ color: "grey" }}></button>
            <button
              className={classes.btn}
              onClick={(e) => {
                e.stopPropagation();
                deleteMailHandler(mail.name);
              }}
            >
              <AiOutlineDelete />
            </button>
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
