import {useContext} from 'react';
import { CartContext } from "../../contexts/cart-context.component"
import "./checkout-item.styles.scss"

const CheckoutItem = ({cartItem}) => {
    const { name, imageUrl, price, quantity } = cartItem;
    const { removeItemFromCheckout, removeItemFromCart, addItemToCart } = useContext(CartContext);

    const removeProductHandler = () => removeItemFromCheckout(cartItem);
    const addItemHandler = () => addItemToCart(cartItem);
    const removeItemHandler = () => removeItemFromCart(cartItem)

  return (
    <div className='checkout-item-container'>
        <div className='image-container'>
            <img src={imageUrl} alt={`${name}`} />
        </div>
        <span className='name'>{name}</span>
        <span className='quantity'>
            <div className='arrow' onClick={removeItemHandler}>&#10094;</div>
            <span className='quantityNum'>{quantity}</span>
            <div className='arrow' onClick={addItemHandler}>&#10095;</div>
        </span>
        <span className='price'>{price}</span>
        <div className='remove-button' onClick={removeProductHandler}>X</div>
    </div>
  )
}

export default CheckoutItem
