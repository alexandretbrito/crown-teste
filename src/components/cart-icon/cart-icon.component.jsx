import { useSelector, useDispatch } from "react-redux";
import { selectIsCartOpen, selectCartQty } from "../../store/cart/cart.selector";
import { setIsCartOpen } from "../../store/cart/cart.actions";
import { ShoppingIcon, CartIconContainer, ItemCount } from "./cart-icon.styles";

const CartIcon = () => {
  const dispatch = useDispatch();
  const isCartOpen = useSelector(selectIsCartOpen);
  const cartQty = useSelector(selectCartQty);

  const cartToggle = () => {
    dispatch(setIsCartOpen(!isCartOpen));
  };

  return (
    <CartIconContainer onClick={cartToggle}>
      <ShoppingIcon />
      <ItemCount>{cartQty}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;
