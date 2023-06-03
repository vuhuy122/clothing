import { createSelector } from "reselect"

const selectCartReducer = (state) => state.cart

export const SelectCartItems = createSelector(
    [selectCartReducer],
    (cart) => cart.cartItems
)
export const SelectCartIsOpen = createSelector(
    [selectCartReducer],
    (cart) => cart.isCartOpen
)
export const selectCartCount = createSelector(
    [SelectCartItems],
    (cartItems) =>
        cartItems?.reduce((total, cartItem) => total + cartItem.quantity, 0)
)
export const selectCartTotal = createSelector(
    [SelectCartItems],

    (cartItems) =>
        cartItems?.reduce((total, cartItem) => total + cartItem.price * cartItem.quantity, 0)
)
