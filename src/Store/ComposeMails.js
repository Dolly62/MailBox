import { createSlice } from "@reduxjs/toolkit";

const mailSlice = createSlice({
  name: "mail",
  initialState: {
    sentMailMsg: [],
    receivedMailmsg: [],
  },
  reducers: {
    replaceMails(state, action) {
      state.sentMailMsg = action.payload.MailMsg;
    },
    addSentMails(state, action) {
      state.sentMailMsg.push(action.payload);
    },
    addReceivedMails(state, action) {
      state.receivedMailmsg.push(action.payload.receivedMailmsg);
    },
    clearAllMails(state) {
      state.sentMailMsg = [];
    },
  },
});

export const mailActions = mailSlice.actions;

export default mailSlice.reducer;
