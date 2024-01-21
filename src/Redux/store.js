import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./Features/Auth/authSlice";
import cartReducer from "./Features/Cart/cartSlice"

export const store = configureStore({
    reducer: {
        auth: authReducer,
        cart: cartReducer
    }
})