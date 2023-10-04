import { createSlice } from "@reduxjs/toolkit";

const mailSlice = createSlice({
  name: "mail",
  initialState: {
    sentMailMsg: [],
    receivedMailmsg: [],
    unreadMsgCount: 0,
  },
  reducers: {
    replaceMails(state, action) {
      state.sentMailMsg = action.payload.MailMsg;
    },
    addSentMails(state, action) {
      state.sentMailMsg.push(action.payload);
    },
    addReceivedMails(state, action) {
      state.receivedMailmsg = action.payload.receivedMailmsg;
    },
    markMsgAsRead(state, action) {
      const { msgName } = action.payload;
      const updatedMsg = state.receivedMailmsg.map((msg) => {
        if (msg.name === msgName) {
          return {
            ...msg,
            isRead: true,
          };
        }
        return msg;
      });
      state.receivedMailmsg = updatedMsg;
    },
    deleteMail(state, action) {
      const dlteMail = action.payload;
      const mailToDelete = state.receivedMailmsg.find(
        (mail) => mail.name === dlteMail
      );

      if (mailToDelete) {
        state.receivedMailmsg = state.receivedMailmsg.filter(
          (dlteEle) => dlteEle.name !== dlteMail
        );
      }
    },
    updateUnreadMsgCount(state, action) {
      state.unreadMsgCount = action.payload;
    },
    clearAllMails(state) {
      state.sentMailMsg = [];
    },
  },
});

export const mailActions = mailSlice.actions;

export default mailSlice.reducer;
