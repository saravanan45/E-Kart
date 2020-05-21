import React from 'react';

const initialState = {
  products: JSON.parse(localStorage.getItem('Products') || '[]') || [],
  cartProducts: JSON.parse(localStorage.getItem('cartProducts') || '[]') || []
  // products: [],
  // cartProducts: []
};
function Reducer(state = initialState, action) {
  switch (action.type) {
    case 'updateProducts':
      return {
        ...state,
        products: action.payload
      };

    case 'updateCartProducts':
      return {
        ...state,
        cartProducts: action.payload
      };
    default:
      return state;
  }
}
export default Reducer;
