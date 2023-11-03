const { createSelector } = require("@reduxjs/toolkit");

const cartSelector = (state) => state.cart;

export const cartTotalSelector = createSelector([cartSelector], (cart) =>
  cart.cart.reduce((total, current) => (total += current.quantity), 0)
);

export const cartPriceSelector = createSelector([cartSelector], (cart) =>
  cart.cart.reduce(
    (total, current) => (total += current.price * current.quantity),
    0
  )
);

export const cartTotalPriceSelector = createSelector(
  state => state.cart.cart, // Assuming this is how your cart state is structured
  cart => {
    return cart.reduce((total, item) => total + item.count * item.grocery.price, 0);
  }
);