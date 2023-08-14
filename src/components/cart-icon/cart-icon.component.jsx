import { useContext } from "react";
import { ReactComponent as ShopBag } from "../../assets/shopping-bag.svg";
import { CartContext } from "../../contexts/cart-context.component";
import "./cart-icon.styles.scss"

const CartIcon = () => {
    const { isCartOpen, setIsCartOpen } = useContext(CartContext);
    const cartToggle = () => {
        setIsCartOpen(!isCartOpen)
    }
  return (
    <div className="cart-icon-container" onClick={cartToggle}>
      <ShopBag className="shopping-icon" />
      <div className="item-count">0</div>
    </div>
  )
}

export default CartIcon
