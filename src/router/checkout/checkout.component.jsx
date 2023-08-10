import { useSelector } from 'react-redux'
import CheckoutItem from '../../components/checkout-item/checkout-item.componet'
import { SelectCartItems, selectCartTotal } from '../../store/cart/cart.selector'
import './checkout.styles.scss'
import PaymentForm from '../../components/payment-form/payment-form.component'
const Checkout = () => {

    const cartItems = useSelector(SelectCartItems)
    const cartTotal = useSelector(selectCartTotal)

    return (
        <div className='checkout-container'>
            <div className='checkout-header'>
                <div className='header-block'>
                    <span>product</span>
                </div>
                <div className='header-block'>
                    <span>Description</span>
                </div>
                <div className='header-block'>
                    <span>Quantity</span>
                </div>
                <div className='header-block'>
                    <span>Price</span>
                </div>
                <div className='header-block'>
                    <span>Remove</span>
                </div>
            </div>
            {cartItems.map((item) => {
                return <CheckoutItem key={item.id} product={item} />
            })}
            <span className='total'>Total: {cartTotal}$</span>

            <PaymentForm/>
        </div>
    )
}
export default Checkout
