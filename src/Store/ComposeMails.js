import { createSlice } from "@reduxjs/toolkit";

const mailSlice = createSlice({
    name: "mail",
    initialState: {
        mailMsg: [],
    },
    reducers: {
        addMails(state, action) {
            state.mailMsg.push(action.payload);
        },
    }
});

export const mailActions = mailSlice.actions;

export default mailSlice.reducer;