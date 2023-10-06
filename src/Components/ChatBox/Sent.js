import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { mailActions } from "../../Store/ComposeMails";
import classes from "./Sent.module.css";
import { AiOutlineDelete } from "react-icons/ai";

const Sent = () => {
  const mailMsg = useSelector((state) => state.composeMail.sentMailMsg);
  // console.log(mailMsg);
  const email = useSelector((state) => state.auth.email);
  // console.log(email);
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const MAX_CHARACTERS = 30;
  const SUB_MAX_CHARACTERS = 10;

  //------------------------------------------------FETCH MAIL FOR SENTBOX----------------------------------//

  const fetchfunctionHandler = async () => {
    const editEmail = email.replace(/[@.]/g, "");
    try {
      const response = await fetch(
        `https://mailbox-client-477fb-default-rtdb.firebaseio.com/composeMail/${editEmail}/sent.json`
      );

      if (!response.ok) {
        throw new Error("Something gone wrong");
      }
      const data = await response.json();

      if (data) {
        const allMails = Object.keys(data).map((key) => ({
          name: key,
          ...data[key],
        }));
        // console.log(allMails);
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

  //------------------------------------------------DELETE MAIL HANDLER------------------------------//
  const deleteSentMailHandler = async (name) => {
    const editEmail = email.replace(/[@.]/g, "");
    try {
      const response = await fetch(
        `https://mailbox-client-477fb-default-rtdb.firebaseio.com/composeMail/${editEmail}/sent/${name}.json`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete a mail in sent box");
      }

      dispatch(mailActions.deletefromSentMail(name));
    } catch (error) {
      alert(error.message);
    }
  };


  //----------------------------------SET TEXT LIMIT------------------------//
  const limitText = (text) => {
    if (text && text.length > MAX_CHARACTERS) {
      return text.substring(0, MAX_CHARACTERS) + "...";
    }
    return text;
  };

  const limitSubText = (subText) => {
    if(subText && subText.length > SUB_MAX_CHARACTERS){
      return subText.substring(0, SUB_MAX_CHARACTERS) + "..";
    }
    return subText;
  }

  return (
    <div className={classes.container}>
      {mailMsg && mailMsg.length > 0 ? (
        mailMsg.map((mail) => (
          <div key={mail.name} id={mail.id} className={classes.row}>
            <div className={classes.col}>
              To:<span>{mail.composeEmail}</span>
            </div>
            <div className={classes.col}>
              {limitSubText(mail.composeSubject)}
              <span style={{ color: "grey" }}>{limitText(mail.textArea)}</span>
            </div>
            <div className={classes.col}>
              <span>{mail.atTime}</span>
              <span>{mail.atDate}</span>
            </div>
            <button
              className={classes.dlteBtn}
              onClick={() => deleteSentMailHandler(mail.name)}
            >
              <AiOutlineDelete />
            </button>
          </div>
        ))
      ) : (
        <div className={classes.norow}>
          <div style={{ margin: "2px auto" }}>No mail is found</div>
        </div>
      )}
    </div>
  );
};

export default Sent;
