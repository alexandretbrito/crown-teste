import { useContext } from "react";
import { CartContext } from "../../contexts/cart-context.component";
import { ShoppingIcon, CartIconContainer, ItemCount } from "./cart-icon.styles";

const CartIcon = () => {
  const { isCartOpen, setIsCartOpen, cartQty } = useContext(CartContext);
  const cartToggle = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <CartIconContainer onClick={cartToggle}>
      <ShoppingIcon />
      <ItemCount>{cartQty}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;
