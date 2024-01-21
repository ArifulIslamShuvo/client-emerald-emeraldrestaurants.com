import { createSlice } from '@reduxjs/toolkit';

const localStorageCart = JSON.parse(localStorage.getItem('cart')) 

const initialState = {

    cartItems: localStorageCart ? localStorageCart : [],
    showCart: false,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''

}

export const cartSlice = createSlice({

    name: 'cart',

    initialState,

    reducers: {

        reset: (state) => {
            state.cartItems = []
            state.showCart = false
            state.isError = false
            state.isSuccess = false
            state.isLoading = false
            state.message = ''
            localStorage.setItem('cart', JSON.stringify(state.cartItems))
        },
        showCart: (state) => {
            state.showCart = true
        },
        closeCart: (state) => {
            state.showCart = false
        },
        addItemWithSize: (state, action) => {
            state.cartItems.push({
                item: action.payload._id,
                size: action.payload.size,
                quantity: 1
            })
            localStorage.setItem('cart', JSON.stringify(state.cartItems))
        },
        removeItemWithSize: (state, action) => {

            const cartItemsJSON = JSON.parse(JSON.stringify(state.cartItems))
            state.cartItems = cartItemsJSON.filter(i => (i.item !== action.payload.item || i.size !== action.payload.size))
            localStorage.setItem('cart', JSON.stringify(state.cartItems))

        },
        increaseQuantity: (state, action) => {

            state.cartItems = state.cartItems.map(i => {
                if (i.item === action.payload.item && i.size === action.payload.size) {
                    return {
                        item: i.item,
                        size: i.size,
                        quantity: i.quantity + 1
                    }
                } else {
                    return i
                }
            })
            localStorage.setItem('cart', JSON.stringify(state.cartItems))
        },
        decreaseQuantity: (state, action) => {

            state.cartItems = state.cartItems.map(i => {
                if (i.item === action.payload.item && i.size === action.payload.size & i.quantity > 1) {
                    return {
                        item: i.item,
                        size: i.size,
                        quantity: i.quantity - 1
                    }
                } else {
                    return i
                }
            })
            localStorage.setItem('cart', JSON.stringify(state.cartItems))
        }

    }

})

export const { showCart, closeCart, addItemWithSize, removeItemWithSize, increaseQuantity, decreaseQuantity, reset } = cartSlice.actions;
export default cartSlice.reducer;