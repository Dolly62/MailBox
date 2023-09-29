import { createSlice } from "@reduxjs/toolkit"

const initialAuthState = {
    isLoggedIn: false,
    token: localStorage.getItem("idToken"),
}


const authSlice = createSlice({
    name: "auth",
    initialState: initialAuthState,
    reducers: {
        login(state, action){
            state.isLoggedIn = true;
            state.token = action.payload.token
        },
        logout(state){
            state.isLoggedIn = false;
            state.token = null;
        },
    }
})

export const authAction = authSlice.actions;

export default authSlice.reducer;