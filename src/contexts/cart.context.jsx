import { createContext, useEffect, useState } from "react"

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

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => { },
    cartItems: [],
    addItemToCart: (item) => { },
    removeItemToCart: (item) => { },
    clearItemFromCart: (item) => { },
    cartTotal: 0
})

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(null)
    const [cartItems, setCartItems] = useState([])
    const [cartTotal, setCartTotal] = useState(0)
    const [cartTotalPrice, setCartTotalPrice] = useState(0)

    useEffect(() => {
        const newTotalCartItems =
            cartItems?.reduce((total, cartItem) => total + cartItem.quantity, 0)
        setCartTotal(newTotalCartItems)
    }, [cartItems])

    useEffect(() => {
        const newTotalPricecCartItems =
            cartItems?.reduce((total, cartItem) => total + cartItem.price * cartItem.quantity, 0)
        setCartTotalPrice(newTotalPricecCartItems)
    }, [cartItems])


    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(productToAdd, cartItems))
    }
    const removeItemToCart = (productToRemove) => {
        setCartItems(removeCartItem(productToRemove, cartItems))
    }
    const clearItemFromCart = (cartItemToClear) => {
        setCartItems(clearCartItem(cartItemToClear, cartItems))
    }
    const values = {
        isCartOpen,
        setIsCartOpen,
        addItemToCart,
        cartItems,
        cartTotal,
        removeItemToCart,
        clearItemFromCart,
        cartTotalPrice
    }

    return (
        <CartContext.Provider value={values}>{children}</CartContext.Provider>
    )
}