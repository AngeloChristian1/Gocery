import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const totalSlice = createSlice({
  name: "total",
  initialState: 0,
  reducers:{
    setTotalItems:(state, action)=>{
        state.totalItems = action.payload + 1
    }
  }
})


export default totalSlice.reducer;

export const{setTotalItems} = totalSlice.actions