import { useContext } from 'react'
import './checkout.styles.scss'
import { CartContext } from '../../contexts/cart.context'
const Checkout = () => {
    const { cartItems, addItemToCart, reduceItemToCart } = useContext(CartContext)

    return (
        <div>
            {cartItems.map((item) => {
                const { name, quantity, imageUrl } = item
                return (
                    <div>
                        <img src={imageUrl} alt={name} />
                        <span>{name}</span>
                        <button onClick={() => reduceItemToCart(item)}>
                            {'<'}
                        </button>
                        <span>{quantity}</span>
                        <button onClick={() => addItemToCart(item)}>
                            {'>'}
                        </button>
                    </div>
                )
            })}
        </div>
    )
}
export default Checkout
