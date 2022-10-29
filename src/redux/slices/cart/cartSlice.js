import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   cart: [],
};

export const cartSlice = createSlice({
   name: 'cart',
   initialState,
   reducers: {
      addToCart: (state, action) => {
         const exist = state.cart.find(
            (item) =>
               item.product_meta.product_slug ===
                  action.payload.product_meta.product_slug &&
               item.product_meta.vendor_slug ===
                  action.payload.product_meta.vendor_slug
         );
         if (!exist) {
            state.cart.push(action.payload);
         } else {
            state.cart = state.cart.map((item) => {
               if (
                  item.product_meta.product_slug ===
                  action.payload.product_meta.product_slug
               ) {
                  item.quantity = action.payload.quantity;
                  item.purchase_type = action.payload.purchase_type;
               }
               return item;
            });
         }
      },
      migrateCart: (state, action) => {
         state.cart = action.payload;
      },
      removeFromCart: (state, action) => {
         console.log(action.payload);
         state.cart = state.cart.filter(
            (item) => item.product_meta.product_slug !== action.payload // slug need to send with payload
         );
      },
      adjustQuantity: (state, action) => {
         state.cart = state.cart.map((item) => {
            if (
               item.product_meta.product_slug === action.payload.product_slug
            ) {
               item.quantity = action.payload.quantity;
            }
            return item;
         });
      },
      increaseQuantity: (state, action) => {
         state.cart = state.cart.map((item) => {
            if (
               item.product_meta.product_slug === action.payload.product_slug
            ) {
               item.quantity = item.quantity + 1;
            }
            return item;
         });
      },
      decreaseQuantity: (state, action) => {
         state.cart = state.cart.map((item) => {
            if (
               item.product_meta.product_slug === action.payload.product_slug
            ) {
               item.quantity = item.quantity - 1;
            }
            return item;
         });
      },
      removeCart: (state, action) => {
         state.cart = [];
      },
   },
});

// Action creators are generated for each case reducer function
export const {
   addToCart,
   removeFromCart,
   adjustQuantity,
   removeCart,
   increaseQuantity,
   decreaseQuantity,
   migrateCart,
} = cartSlice.actions;

export default cartSlice.reducer;
