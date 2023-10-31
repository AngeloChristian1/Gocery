import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
  },

  reducers: {
    addToCart: (state, action) => {
        const { id } = action.payload;
        const itemInCart = state.cart.find((item) => item.id === id);
      
        if (itemInCart) {
          // Create a new array with the updated item quantity
          state.cart = state.cart.map((item) =>
            item.id === id ? { ...item, quantity: item.count + 1 } : item
          );
        } else {
          state.cart.push({ ...action.payload, quantity: 1 });
        }
      },

    removeFromCart: (state, action) => {
      const removeFromCart = state.cartfilter(
        (item) => item.id == action.payload.id
      );
      state.cart = removeFromCart;
    },

    incrementQuantity: (state, action) => {
      const itemInCart = state.cart.find(
        (item) => item.id == action.payload.id
      );
      itemInCart.quantity++;
    },

    decrementQuantity: (state, action) => {
      const itemInCart = state.cart.find(
        (item) => item.id == action.payload.id
      );
      if (itemInCart.quantity == 1) {
        const removeFromCart = state.cartfilter(
          (item) => item.id == action.payload.id
        );
        state.cart = removeFromCart;
      } else {
        itemInCart.quantity--;
      }
    },
  },
});

export const increaseQuantity2 = (item) => {
    return {
      type: INCREMENT_QUANTITY,
      payload: item,
    };
  };

  export const decreaseQuantity = (item) => {
    return {
      type: DECREMENT_QUANTITY,
      payload: item,
    };
  };

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
