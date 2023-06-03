import { combineReducers } from "redux";
import { CartReducer } from "./cart/cart.reducer";
import { categoryReducer } from "./category/category.reducer";
import { userReducer } from "./user/user.reducer";

export const rootReducer = combineReducers({
    user: userReducer,
    categories: categoryReducer,
    cart: CartReducer
})