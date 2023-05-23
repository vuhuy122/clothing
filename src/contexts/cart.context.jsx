import { createContext, useReducer } from "react"
import { createAction } from "../utils/firebase/reducer/reducer.utils"


export const CART_ACTIONS_TYPES = {
    SET_CART_ITEM: 'SET_CART_ITEM',
    SET_CART_DROPDOWN_OPEN: 'SET_CART_DROPDOWN_OPEN',
}

const INITIAL_STATES = {
    cartItems: [],
    cartTotal: 0,
    cartCount: 0,
    isCartOpen: false
}


const addCartItem = (productToAdd, cartItems) => {
    // find if productToAdd contains productToAdd
    const exisingCartItem = cartItems.find(cartItem => cartItem?.id === productToAdd?.id)
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


const CartReducer = (state, action) => {
    const { type, payload } = action
    switch (type) {
        case CART_ACTIONS_TYPES.SET_CART_ITEM:
            return {
                ...state,
                ...payload
            }
        case CART_ACTIONS_TYPES.SET_CART_DROPDOWN_OPEN:
            return {
                ...state,
                isCartOpen: !state.isCartOpen
            }
        default:
            throw new Error(`Unknown action type ${type} in CartReducer`)
    }
}
export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => { },
    cartItems: [],
    addItemToCart: (item) => { },
    removeItemToCart: (item) => { },
    clearItemFromCart: (item) => { },
    cartCount: 0,
    cartTotal: 0
})

export const CartProvider = ({ children }) => {
    const [{ isCartOpen, cartItems, cartTotal, cartCount }, dispatch] = useReducer(CartReducer, INITIAL_STATES)
    const updateCartReducer = (newCartItem) => {
        const newCartCount = newCartItem?.reduce((total, cartItem) => total + cartItem.quantity, 0)
        const newCartTotal = newCartItem?.reduce((total, cartItem) => total + cartItem.price * cartItem.quantity, 0)
        const payload = {
            cartItems: newCartItem,
            cartTotal: newCartTotal,
            cartCount: newCartCount,
        }
        dispatch(createAction(CART_ACTIONS_TYPES.SET_CART_ITEM, payload))
    }
    const addItemToCart = (productToAdd) => {
        updateCartReducer(addCartItem(productToAdd, cartItems))

    }
    const removeItemToCart = (productToRemove) => {
        updateCartReducer(removeCartItem(productToRemove, cartItems))
    }
    const clearItemFromCart = (cartItemToClear) => {
        updateCartReducer(clearCartItem(cartItemToClear, cartItems))

    }
    const setIsCartOpen = () => {
        dispatch(createAction(CART_ACTIONS_TYPES.SET_CART_DROPDOWN_OPEN))
    }
    const values = {
        isCartOpen,
        cartItems,
        cartCount,
        cartTotal,
        setIsCartOpen,
        addItemToCart,
        removeItemToCart,
        clearItemFromCart,
    }

    return (
        <CartContext.Provider value={values}>{children}</CartContext.Provider>
    )
}