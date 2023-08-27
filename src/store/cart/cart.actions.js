import CART_TYPES from "./cart.types";
import { createAction } from "../../utils/reducer/reducer.utils";

///////////////////// ACTIONS /////////////////////

export const setIsCartOpen = (bool) =>
  createAction(CART_TYPES.SET_IS_CART_OPEN, bool);

export const removeItemFromCart = (cartItems, pulledProduct) => {
  const newCartItems = removeCartItem(cartItems, pulledProduct);
  return createAction(CART_TYPES.SET_CART_ITEMS, newCartItems);
};

export const addItemToCart = (cartItems, productToAdd) => {
  const newCartItems = addCartItem(cartItems, productToAdd);
  return createAction(CART_TYPES.SET_CART_ITEMS, newCartItems);
};

export const removeItemFromCheckout = (cartItems, itemToRemove) => {
  const newCartItems = removeCheckoutItem(cartItems, itemToRemove);
  return createAction(CART_TYPES.SET_CART_ITEMS, newCartItems);
};

///////////////////// AUXILIARY FUNCTIONS /////////////////////

const removeCheckoutItem = (cartItems, itemToRemove) => {
  return cartItems.filter((cartItem) => cartItem.id !== itemToRemove.id);
};

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
