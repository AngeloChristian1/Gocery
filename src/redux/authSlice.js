import { createSlice } from "@reduxjs/toolkit";

const initial ={
    authStatus:false,
    authLoaded:false,
    authProfile:null,
    authToken:"",
}


const authSlice = createSlice({
    name:"auth",
    initialState:initial,
    reducers:{
        setAuthStatus:(state,action)=>{
            state.authStatus = action.payload;
        },
        setAuthLoaded:(state,action)=>{
            state.authLoaded = action.payload;
        },
        setAuthProfile:(state,action)=>{
            state.authProfile = action.payload;
        },
        setAuthToken:(state,action)=>{
            state.authToken = action.payload;
        },
    }
});

export default authSlice.reducer;

export const{setAuthLoaded, setAuthProfile, setAuthStatus, setAuthToken} = authSlice.actions