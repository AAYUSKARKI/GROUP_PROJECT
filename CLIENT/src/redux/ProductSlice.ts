import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: null
}

 const ProductSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        setproduct: (state, action) => {
            state.products = action.payload
        }
    }
})

export const { setproduct } = ProductSlice.actions

export default ProductSlice.reducer
