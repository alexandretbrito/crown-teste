import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from "../button/button.component"
import CartItem from '../cart-item/cart-item.component'
import { CartContext } from '../../contexts/cart-context.component'
import "./cart-dropdown.styles.scss"

const DropDown = () => {
  const { cartItems, isCartOpen, setIsCartOpen, } = useContext(CartContext)
  const navigate = useNavigate()

  const goToCheckout = () => {
    navigate("./checkout")
  }

  return (
    <div className='cart-dropdown-container'>
        <div className='cart-items'>
            {cartItems.map( item => (
              <CartItem key={item.id} cartItem={item}/>
            ))}
        </div>
      <Button onClick={goToCheckout}>IR PARA O CHECKOUT</Button>
    </div>
  )
}

export default DropDown
