import { CartItemContainer, ItemCartName, ItemCartPrice, ItemDetail } from './cart-item.styles';

const CartItem = ({ cartItem }) => {
    const { imageUrl, price, name, quantity } = cartItem;

    return (
        <CartItemContainer>
            <img src={imageUrl} alt={`${name}`} />
            <ItemDetail>
                <ItemCartName>{name}</ItemCartName>
                <ItemCartPrice>
                    {quantity} x ${price}
                </ItemCartPrice>
            </ItemDetail>
        </CartItemContainer>
    );
};

export default CartItem;