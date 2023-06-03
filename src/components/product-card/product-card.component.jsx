import { useDispatch, useSelector } from 'react-redux'
import { addItemToCart } from '../../store/cart/cart.action'
import { SelectCartItems } from '../../store/cart/cart.selector'
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component'
import './product-card.styles.scss'
const ProductCard = ({ product }) => {
    const { id, name, price, imageUrl } = product

    const dispatch = useDispatch()

    const cartItems = useSelector(SelectCartItems)
    console.log('cartItems', cartItems);
    const addProductToCart = () => dispatch(addItemToCart(product, cartItems))

    return (
        <div key={id} className='product-card-container'>
            <img src={imageUrl} alt={`${name}`} />
            <div className='footer'>
                <span className='name'>{name}</span>
                <span className='price'>{price}</span>
            </div>
            <Button buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={addProductToCart} >Add to cart</Button>
        </div>
    )
}
export default ProductCard
