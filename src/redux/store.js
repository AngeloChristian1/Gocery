import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice"
import cartReducer from "./cartReducer";
import { combineReducers } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
// import { persistReducer } from "redux-persist";


export const store =configureStore({
    reducer:{
        auth: authReducer,
        cart: cartReducer,
    }
})
