import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
import { selectCartItems, selectCartTotal } from '../../store/cart/cart.selector';
import { CartDropDownContainer, CartItems, CartTotal, EmptyMesssage } from './cart-dropdown.styles';

const DropDown = () => {
  // const { cartItems, cartotal } = useContext(CartContext)
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  const navigate = useNavigate()

  const goToCheckout = () => {
    navigate("./checkout")
  }

  return (
    <CartDropDownContainer>
        <CartItems>
          {cartItems.length ? 
          (cartItems.map( item => (
              <CartItem key={item.id} cartItem={item}/>
            )))
          :    
            (<EmptyMesssage>Carrinho vazio</EmptyMesssage>)
          }         
        </CartItems>
        <CartTotal>
          R$ {cartTotal}
        </CartTotal>
      <Button onClick={goToCheckout}>IR PARA O CHECKOUT</Button>
    </CartDropDownContainer>
  )
}

export default DropDown
