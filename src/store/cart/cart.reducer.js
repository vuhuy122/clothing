import { CART_ACTIONS_TYPES } from "./cart.type"

const INITIAL_STATES = {
    cartItems: [],
    cartTotal: 0,
    cartCount: 0,
    isCartOpen: false
}

export const CartReducer = (state = INITIAL_STATES, action = {}) => {
    const { type, payload } = action
    switch (type) {
        case CART_ACTIONS_TYPES.SET_CART_ITEM:
            return {
                ...state,
                ...payload,
            }
        case CART_ACTIONS_TYPES.SET_CART_DROPDOWN_OPEN:
            return {
                ...state,
                isCartOpen: payload
            }
        default:
            return state
    }
}