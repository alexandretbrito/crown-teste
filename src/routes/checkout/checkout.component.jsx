import { useContext } from "react";
import { CartContext } from "../../contexts/cart-context.component";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import "./checkout.styles.scss";

const Checkout = () => {
  const { cartItems, cartotal } = useContext(CartContext);

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
        <span>Total: R${cartotal}</span>
      </div>
    </div>
  );
};

export default Checkout;
