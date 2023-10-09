import { mailActions } from "./ComposeMails";

export const fetchMailData = () => {
  return async (dispatch, getState) => {
    const email = getState().auth.email;
    const editEmail = email.replace(/[@.]/g, "");
    try {
      const sentResponse = await fetch(
        `https://mailbox-client-477fb-default-rtdb.firebaseio.com/composeMail/${editEmail}/sent.json`
      );

      if (!sentResponse.ok) {
        throw new Error("Failed to fetch sent mails");
      }

      const sentData = await sentResponse.json();

      if (!sentData) {
        console.log("clear");
        dispatch(mailActions.clearAllMails());
      }
      if (sentData) {
        const sentMails = Object.keys(sentData).map((key) => ({
          name: key,
          ...sentData[key],
        }));

        dispatch(mailActions.replaceMails({ sentMailMsg: sentMails }));
        dispatch(mailActions.updateTotalMsgInSent(sentMails.length));
      }

      const inboxResponse = await fetch(
        `https://mailbox-client-477fb-default-rtdb.firebaseio.com/composeMail/${editEmail}/inbox.json`
      );
      if (!inboxResponse.ok) {
        throw new Error("Failed to fetch inbox mails");
      }

      const inboxData = await inboxResponse.json();

      //   if (!inboxData) {
      //     dispatch(mailActions.clearAllMails());
      //   }
      if (inboxData) {
        const inboxMails = Object.keys(inboxData).map((key) => ({
          name: key,
          ...inboxData[key],
        }));

        const unreadInboxMails = inboxMails.filter((mail) => !mail.isRead);

        dispatch(mailActions.addReceivedMails({ receivedMailmsg: inboxMails }));
        dispatch(mailActions.updateUnreadMsgCount(unreadInboxMails.length));
      }
    } catch (error) {
      alert(error.message);
    }
  };
};
