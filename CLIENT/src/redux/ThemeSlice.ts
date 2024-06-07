import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    theme: 'light'
}

 const ThemeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        settheme: (state, action) => {
            state.theme = action.payload
        }
    }
})

export const { settheme } = ThemeSlice.actions

export default ThemeSlice.reducer
