import { createSlice } from "@reduxjs/toolkit";

const mailSlice = createSlice({
  name: "mail",
  initialState: {
    sentMailMsg: [],
    sentInboxMail: [],
    receivedMailmsg: [],
    unreadMsgCount: 0,
    totalMsg: 0,
  },
  reducers: {
    replaceMails(state, action) {
      state.sentInboxMail = action.payload.sentMailMsg;
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
      const mailToDelete = state.sentInboxMail.find(
        (mail) => mail.name === dlteMail
      );

      if (mailToDelete) {
        state.sentInboxMail = state.sentInboxMail.filter(
          (dlteEle) => dlteEle.name !== dlteMail
        );
      }
    },
    updateUnreadMsgCount(state, action) {
      state.unreadMsgCount = action.payload;
    },
    updateTotalMsgInSent(state, action) {
      state.totalMsg = action.payload;
    },
    clearAllMails(state) {
      state.receivedMailmsg = [];
      state.sentInboxMail = [];
      state.sentMailMsg = [];
      state.totalMsg = 0;
      state.unreadMsgCount = 0;
    },
  },
});

export const mailActions = mailSlice.actions;

export default mailSlice.reducer;
