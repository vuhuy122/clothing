import { useContext } from 'react'
import './cart-icon.styles.jsx'
import { CartContext } from '../../contexts/cart.context'
import { CartIconContainer, ShoppingIcon, ItemCount } from './cart-icon.styles.jsx'
const CartIcon = () => {
    const { isCartOpen, setIsCartOpen, cartTotal } = useContext(CartContext)

    const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen)
    return (
        <CartIconContainer onClick={toggleIsCartOpen}>
            <ShoppingIcon className='shopping-icon' />
            <ItemCount>{cartTotal}</ItemCount>
        </CartIconContainer>
    )
}
export default CartIcon