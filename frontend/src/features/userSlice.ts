import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
    userStatus:false,
    user:null
}


const userSlice = createSlice({
    name:"userDATa",
    initialState:INITIAL_STATE,
    reducers:{
        updateStatus:(state,actions) =>{
            state.user = actions.payload;
            state.userStatus = true;
        },
        clearUser:(state) =>{
            state.userStatus = false;
            state.user = null;
        }
    }
})

export const { updateStatus, clearUser } = userSlice.actions;

export default userSlice.reducer;