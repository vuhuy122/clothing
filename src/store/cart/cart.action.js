import { createAction } from "../../utils/firebase/reducer/reducer.utils";
import { CART_ACTIONS_TYPES } from "./cart.type";


const addCartItem = (productToAdd, cartItems) => {
    // find if productToAdd contains productToAdd
    const exisingCartItem = cartItems?.find(cartItem => cartItem?.id === productToAdd?.id)
    // if found increment quantity
    if (!!exisingCartItem) {
        return cartItems?.map(cartItem => cartItem.id === productToAdd.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem)
    }
    // return new array with modified cart items / new cart items
    return [...cartItems, { ...productToAdd, quantity: 1 }];
}
const removeCartItem = (productToRemove, cartItems) => {

    const exisingCartItem = cartItems.find(cartItem => cartItem?.id === productToRemove?.id)

    if (exisingCartItem?.quantity === 1) {
        return cartItems.filter(function (item) {
            return item !== productToRemove;
        });
    }
    // quantity = 1 => delete cart items
    return cartItems?.map(cartItem => cartItem.id === productToRemove.id
        ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem)

}
const clearCartItem = (cartItemToClear, cartItems) => cartItems.filter(function (item) {
    return item !== cartItemToClear;
});



const updateCartReducer = (newCartItem) => {
    const newCartCount = newCartItem?.reduce((total, cartItem) => total + cartItem.quantity, 0)
    const newCartTotal = newCartItem?.reduce((total, cartItem) => total + cartItem.price * cartItem.quantity, 0)
    const payload = {
        cartItems: newCartItem,
        cartTotal: newCartTotal,
        cartCount: newCartCount,
    }
    return createAction(CART_ACTIONS_TYPES.SET_CART_ITEM, payload)
}

export const addItemToCart = (productToAdd, cartItems) => {
    const newCartItem = addCartItem(productToAdd, cartItems)
    return updateCartReducer(newCartItem)

}
export const removeItemToCart = (productToRemove, cartItems) => {
    return updateCartReducer(removeCartItem(productToRemove, cartItems))
}
export const clearItemFromCart = (cartItemToClear, cartItems) => {
    return updateCartReducer(clearCartItem(cartItemToClear, cartItems))

}
export const setIsCartOpen = (bool) => {
    return createAction(CART_ACTIONS_TYPES.SET_CART_DROPDOWN_OPEN, bool)
}