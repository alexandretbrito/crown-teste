import { createContext, useEffect, useState } from "react";

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  cartQty: 0
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartQty, setCartQty] = useState(0)

  useEffect(() => {
    const cartTotal = cartItems.reduce((oldVal, cartItem) => oldVal + cartItem.quantity, 0);
    setCartQty(cartTotal);
  }, [cartItems])

  const addCartItem = (cartItems, addedProduct) => {
    
    const existCartItem = cartItems.find((cartItem) => (
      cartItem.id === addedProduct.id
    ));

    if (existCartItem) {
      return cartItems.map((cartItem) =>
        cartItem.id === addedProduct.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
    }

    return [...cartItems, {... addedProduct, quantity: 1}]
  };

  const addItemToCart = (productToAdd) => {
    console.log(productToAdd);
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  const value = { isCartOpen, setIsCartOpen, cartItems, addItemToCart, cartQty };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
