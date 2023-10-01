import { createSlice } from "@reduxjs/toolkit";

const mailSlice = createSlice({
  name: "mail",
  initialState: {
    mailMsg: [],
  },
  reducers: {
    replaceMails(state, action) {
      state.mailMsg = action.payload.mailMsg;
    },
    addMails(state, action) {
      state.mailMsg.push(action.payload);
    },
    clearAllMails(state){
      state.mailMsg = []
    },
  },
});

export const mailActions = mailSlice.actions;

export default mailSlice.reducer;
