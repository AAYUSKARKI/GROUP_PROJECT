import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null
}

 const UserSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setuser: (state, action) => {
            state.user = action.payload
        }
    }
})

export const { setuser } = UserSlice.actions

export default UserSlice.reducer