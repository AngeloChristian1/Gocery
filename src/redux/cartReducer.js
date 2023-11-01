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
            item.id === id ? { ...item, count: item.count + 1 } : item
          );
        } else {
          state.cart.push({ ...action.payload, count: 1 });
        }
      },

    removeFromCart: (state, action) => {
      const removeFromCart = state.cart.filter(
        (item) => item.id == action.payload.id
      );
      state.cart = removeFromCart;
    },

    incrementQuantity: (state, action) => {
      const { id } = action.payload;
      state.cart = state.cart.map((item) =>
            item.id === id ? { ...item, count: item.count + 1 } : item
          );
    },

    decrementQuantity: (state, action) => {
      const itemInCart = state.cart.find(
        (item) => item.id == action.payload.id
      );
      if (itemInCart.count == 1) {
        const removeFromCart = state.cart.filter(
          (item) => item.id == action.payload.id
        );
        state.cart = removeFromCart;
      } else { 
        itemInCart.count--;
      }
    },
    clearCart:(state, action)=> {
      return [];
    },
  },
});

// export const increaseQuantity2 = (item) => {
//     return {
//       type: INCREMENT_QUANTITY,
//       payload: item,
//     };
//   };

//   export const decreaseQuantity = (item) => {
//     return {
//       type: DECREMENT_QUANTITY,
//       payload: item,
//     };
//   };

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
