import { createSelector } from "reselect";

const selectCartReducer = (state) => state.cart;

export const selectCartItems = createSelector(
  [selectCartReducer],
  (cart) => cart.cartItems
);

export const selectIsCartOpen = createSelector(
  [selectCartReducer],
  (cart) => cart.isCartOpen
);

export const selectCartQty = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce((oldVal, cartItem) => oldVal + cartItem.quantity, 0)
);

export const selectCartTotal = createSelector(
  [selectCartItems],
  (cartItems) =>
    cartItems.reduce(
      (oldVal, cartItem) => oldVal + cartItem.quantity * cartItem.price,
      0
    )
);
