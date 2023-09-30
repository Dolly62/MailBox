import { createSlice } from "@reduxjs/toolkit"

const initialAuthState = {
    isLoggedIn: false,
    token: localStorage.getItem("idToken"),
    email: localStorage.getItem("email"),
}


const authSlice = createSlice({
    name: "auth",
    initialState: initialAuthState,
    reducers: {
        login(state, action){
            state.isLoggedIn = true;
            state.token = action.payload.token;
            state.email = action.payload.email;
        },
        logout(state){
            state.isLoggedIn = false;
            state.token = null;
            state.email = null;
        },
    }
})

export const authAction = authSlice.actions;

export default authSlice.reducer;