import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./AuthReducer";
import mailReducer from "./ComposeMails";

const store = configureStore({
    reducer: {
        auth: AuthReducer,
        composeMail: mailReducer,
    }
})

export default store;