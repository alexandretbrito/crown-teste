import { createContext, useEffect, useState } from "react";

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  cartQty: 0,
  removeItemFromCheckout: () => {},
  cartotal: 0
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartQty, setCartQty] = useState(0);
  const [cartotal, setCartotal] = useState(0)

  useEffect(() => {
    const cartitemsQty = cartItems.reduce(
      (oldVal, cartItem) => oldVal + cartItem.quantity,
      0
    );
    setCartQty(cartitemsQty);
  }, [cartItems]);

  useEffect(() => {
    const cartTotal = cartItems.reduce(
      (oldVal, cartItem) => oldVal + cartItem.quantity * cartItem.price,
      0
    );
    setCartotal(cartTotal);
  }, [cartItems]);

  const addCartItem = (cartItems, addedProduct) => {
    const existCartItem = cartItems.find(
      (cartItem) => cartItem.id === addedProduct.id
    );

    if (existCartItem) {
      return cartItems.map((cartItem) =>
        cartItem.id === addedProduct.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
    }

    return [...cartItems, { ...addedProduct, quantity: 1 }];
  };

  const removeCartItem = (cartItems, pulledProduct) => {
    const existCartItem = cartItems.find(
      (cartItem) => cartItem.id === pulledProduct.id
    );

    if (existCartItem.quantity === 1) {
      console.log(
        cartItems.filter((cartItem) => cartItem.id !== pulledProduct.id)
      );
      return cartItems.filter((cartItem) => cartItem.id !== pulledProduct.id);
    }

    return cartItems.map((cartItem) =>
      cartItem.id === pulledProduct.id
        ? { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem
    );
  };

  const removeCheckoutItem = (cartItems, itemToRemove) =>{
    return cartItems.filter((cartItem) => cartItem.id !== itemToRemove.id)
  }

  const removeItemFromCart = (pulledProduct) => {
    setCartItems(removeCartItem(cartItems, pulledProduct));
  };

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  const removeItemFromCheckout = (itemToRemove) => {
    setCartItems(removeCheckoutItem(cartItems, itemToRemove));
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemToCart,
    cartQty,
    removeItemFromCart,
    removeItemFromCheckout,
    cartotal
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
