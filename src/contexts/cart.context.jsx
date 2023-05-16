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
const reduceCartItem = (productToReduce, cartItems) => {

    const exisingCartItem = cartItems.find(cartItem => cartItem?.id === productToReduce?.id)
    if (exisingCartItem?.quantity === 1) {
        return cartItems.filter(function (item) {
            return item !== productToReduce;
        });
    }
    // quantity = 1 => delete cart items
    return cartItems?.map(cartItem => cartItem.id === productToReduce.id
        ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem)

}

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => { },
    cartItems: [],
    addItemToCart: (item) => { },
    reduceItemToCart: (item) => { },
    cartTotal: 0
})

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(null)
    const [cartItems, setCartItems] = useState([])
    const [cartTotal, setCartTotal] = useState(0)

    useEffect(() => {
        const newTotalCartItems = cartItems?.reduce((total, cartItem) => total + cartItem.quantity, 0)
        setCartTotal(newTotalCartItems)
    }, [cartItems])

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(productToAdd, cartItems))
    }
    const reduceItemToCart = (productToAdd) => {
        setCartItems(reduceCartItem(productToAdd, cartItems))
    }
    const values = { isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartTotal, reduceItemToCart }

    return (
        <CartContext.Provider value={values}>{children}</CartContext.Provider>
    )
}