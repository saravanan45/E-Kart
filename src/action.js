export function updateStoreProducts(payload) {
  return {
    type: 'updateProducts',
    payload
  };
}

export function updateStoreCartProducts(payload) {
  return {
    type: 'updateCartProducts',
    payload
  };
}
