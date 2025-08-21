import { createSlice } from "@reduxjs/toolkit";

export const locationSlice=createSlice({
    name:"locatin",
    initialState:{
        location:""
    },
    reducers:{
        setLocation: (state, action) => {
            state.location=action.payload
        }
    }
})

export const { setLocation } = locationSlice.actions;
export default locationSlice.reducer