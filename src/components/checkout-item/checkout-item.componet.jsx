import { useContext } from "react"
import { CartContext } from "../../contexts/cart.context"
import './checkout-item.styles.scss'

const CheckoutItem = ({ product }) => {
    const { addItemToCart, removeItemToCart, clearItemFromCart } = useContext(CartContext)

    const { name, quantity, imageUrl, price } = product

    const removeItemHandler = () => removeItemToCart(product)
    const addItemHandler = () => addItemToCart(product)
    const clearItemHandler = () => clearItemFromCart(product)
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