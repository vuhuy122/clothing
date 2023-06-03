import { useDispatch, useSelector } from "react-redux"
import { addItemToCart, clearItemFromCart, removeItemToCart } from "../../store/cart/cart.action"
import { SelectCartItems } from "../../store/cart/cart.selector"
import './checkout-item.styles.scss'

const CheckoutItem = ({ product }) => {
    const dispatch = useDispatch()
    const { name, quantity, imageUrl, price } = product
    const cartItems = useSelector(SelectCartItems)
    const removeItemHandler = () => dispatch(removeItemToCart(product, cartItems))
    const addItemHandler = () => dispatch(addItemToCart(product, cartItems))
    const clearItemHandler = () => dispatch(clearItemFromCart(product, cartItems))

    return (
        <div className="checkout-item-container">
            <div className="image-container" >
                <img src={imageUrl} alt={name} />
            </div>
            <span className="name">{name}</span>
            <span className="quantity">
                <div className="arrow" onClick={removeItemHandler}>&#10094;</div>
                <span className="value">{quantity}</span>
                <div className="arrow" onClick={addItemHandler}>&#10095;</div>
            </span>
            <span className="price">{quantity * price}$</span>
            <div onClick={clearItemHandler} className="remove-button">&#10005;</div>
        </div>
    )
}
export default CheckoutItem