import { useDispatch, useSelector } from 'react-redux'
import { setIsCartOpen } from '../../store/cart/cart.action.js'
import { selectCartCount, SelectCartIsOpen } from '../../store/cart/cart.selector.js'
import './cart-icon.styles.jsx'

import { CartIconContainer, ItemCount, ShoppingIcon } from './cart-icon.styles.jsx'

const CartIcon = () => {
    const dispatch = useDispatch()
    const isCartOpen = useSelector(SelectCartIsOpen)
    const cartCount = useSelector(selectCartCount)

    const toggleIsCartOpen = () => dispatch(setIsCartOpen(!isCartOpen))
    return (
        <CartIconContainer onClick={toggleIsCartOpen}>
            <ShoppingIcon className='shopping-icon' />
            <ItemCount>{cartCount}</ItemCount>
        </CartIconContainer>
    )
}
export default CartIcon