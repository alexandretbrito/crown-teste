import { createContext, useReducer } from "react";

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  cartQty: 0,
  removeItemFromCheckout: () => {},
  cartotal: 0,
});

const CART_TYPES = {
  SET_CART_ITEMS: "SET_CART_ITEMS",
  SET_IS_CART_OPEN: "SET_IS_CART_OPEN",
};

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartQty: 0,
  cartotal: 0,
};

const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case CART_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload,
      };
    case CART_TYPES.SET_IS_CART_OPEN:
      return {
        ...state,
        isCartOpen: payload,
      };
    default:
      throw new Error(`Unhandled error type ${type} in cartReducer`);
  }
};

export const CartProvider = ({ children }) => {
  const [{ cartItems, cartQty, cartotal, isCartOpen }, dispatch] = useReducer(
    cartReducer,
    INITIAL_STATE
  );

  const updateCartItemsReducer = (newCartItems) => {
    const newCartitemsQty = newCartItems.reduce(
      (oldVal, cartItem) => oldVal + cartItem.quantity,
      0
    );

    const newCartTotal = newCartItems.reduce(
      (oldVal, cartItem) => oldVal + cartItem.quantity * cartItem.price,
      0
    );

    dispatch({
      type: CART_TYPES.SET_CART_ITEMS,
      payload: {
        cartItems: newCartItems,
        cartQty: newCartitemsQty,
        cartotal: newCartTotal,
      },
    });
  };

  const removeCheckoutItem = (cartItems, itemToRemove) => {
    return cartItems.filter((cartItem) => cartItem.id !== itemToRemove.id);
  };

  const removeItemFromCart = (pulledProduct) => {
    const newCartItems = removeCartItem(cartItems, pulledProduct);
    updateCartItemsReducer(newCartItems);
  };

  const addItemToCart = (productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    updateCartItemsReducer(newCartItems);
  };

  const removeItemFromCheckout = (itemToRemove) => {
    const newCartItems = removeCheckoutItem(cartItems, itemToRemove);
    updateCartItemsReducer(newCartItems);
  };

  const setIsCartOpen = (bool) => {
    dispatch({type: CART_TYPES.SET_IS_CART_OPEN, payload: bool})
  }

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

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemToCart,
    cartQty,
    removeItemFromCart,
    removeItemFromCheckout,
    cartotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
