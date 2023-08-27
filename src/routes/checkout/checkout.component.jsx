import { useSelector } from 'react-redux';
import { selectCartItems, selectCartTotal } from '../../store/cart/cart.selector'
import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import "./checkout.styles.scss";

const Checkout = () => {
  // const { cartItems, cartotal } = useContext(CartContext);
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <div className="header-block">
          <span>Produto</span>
        </div>
        <div className="header-block">
          <span>Descrição</span>
        </div>
        <div className="header-block">
          <span>Qtd.</span>
        </div>
        <div className="header-block">
          <span>Preço</span>
        </div>
        <div className="header-block">
          <span>Remover</span>
        </div>
      </div>
      
        {cartItems.map((cartItem) => {return <CheckoutItem key={cartItem.id} cartItem={cartItem} />})}
      <div className="total">
        <span>Total: R${cartTotal}</span>
      </div>
    </div>
  );
};

export default Checkout;
