import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { mailActions } from "../../Store/ComposeMails";

const Inbox = () => {
  const mailMsg = useSelector((state) => state.composeMail.mailMsg);
  const email = useSelector((state) => state.auth.email);
  const composeEmail = useSelector((state) => state.composeMail.sentMail);
  console.log(composeEmail);

  const dispatch = useDispatch();

  const fetchMailDataForInbox = async () => {
    const editEmail = email.replace(/[@.]/g, "");
    try {
      const response = await fetch(
        `https://mailbox-client-477fb-default-rtdb.firebaseio.com/composeMail.json?"${composeEmail}"&equalTo="${editEmail}"`
      );

      if (!response.ok) {
        const errmsg = "Something went wrong";
        throw new Error(errmsg);
      }
      const data = await response.json();
      console.log(data);

      if (data != null) {
        const fetchingMails = Object.keys(data).map((key) => ({
          name: key,
          ...data[key],
        }));
        dispatch(mailActions.replaceMails({ mailMsg: fetchingMails }));
      } else {
        return;
      }
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    fetchMailDataForInbox();
  }, []);

  return (
    <table>
      <tbody>
        {mailMsg && mailMsg > 0 ? (
          mailMsg.map((mail) => (
            <tr key={mail.name} id={mail.name}>
              <td>{mail.composeEmail}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td>No mail is found</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default Inbox;
