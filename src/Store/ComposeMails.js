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
      state.sentMailMsg = action.payload.sentMailMsg;
    },
    addSentMails(state, action) {
      state.sentMailMsg.push(action.payload);
    },
    addReceivedMails(state, action) {
      state.receivedMailmsg = action.payload.receivedMailmsg;
    },
    markMsgAsRead(state, action) {
      const { msgName, isRead } = action.payload;
      state.receivedMailmsg = state.receivedMailmsg.map((msg) =>
        msg.name === msgName ? { ...msg, isRead: isRead } : msg
      );
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
    deletefromSentMail(state, action) {
      const dlteMail = action.payload;
      const mailToDelete = state.sentMailMsg.find(
        (mail) => mail.name === dlteMail
      );

      if (mailToDelete) {
        state.sentMailMsg = state.sentMailMsg.filter(
          (dlteEle) => dlteEle.name !== dlteMail
        );
      }
    },
    updateUnreadMsgCount(state, action) {
      state.unreadMsgCount = action.payload;
    },
    clearAllMails(state) {
      state.receivedMailmsg = [];
      state.sentMailMsg = [];
    },
  },
});

export const mailActions = mailSlice.actions;

export default mailSlice.reducer;
