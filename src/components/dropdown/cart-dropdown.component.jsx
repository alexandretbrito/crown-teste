import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from "../button/button.component";
import CartItem from '../cart-item/cart-item.component';
import { CartContext } from '../../contexts/cart-context.component';
import { CartDropDownContainer, CartItems, CartTotal, EmptyMesssage } from './cart-dropdown.styles';

const DropDown = () => {
  const { cartItems, cartotal } = useContext(CartContext)
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
          R$ {cartotal}
        </CartTotal>
      <Button onClick={goToCheckout}>IR PARA O CHECKOUT</Button>
    </CartDropDownContainer>
  )
}

export default DropDown
