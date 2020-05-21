import React, { useState, useEffect } from 'react';
import DisplayProduct from '../Products/DisplayProduct/index';
import { db } from '../Firebase/index';
import { connect } from 'react-redux';
import { updateStoreProducts, updateStoreCartProducts } from '../action';

function Product({
  productsList,
  updateCartProducts,
  cartProducts,
  filteredProducts,
  userName,
  goToLoginButton,
  updateDBCartProducts,
  goToCheckoutPage
}) {
  const addToCart = productIndex => {
    if (!userName) {
      goToLoginButton();
      return;
    }
    const cartProduct = productsList.find(
      (product, index) => index === productIndex
    );
    const cart = JSON.parse(localStorage.getItem('cartProducts')) || [];
    cart.push(cartProduct);
    updateDBCartProducts(cart);
    localStorage.setItem('cartProducts', JSON.stringify(cart));
    updateCartProducts(cart);
  };

  const products = () => {
    if (filteredProducts.length) {
      return filteredProducts;
    }
    return productsList;
  };
  return (
    <div>
      {products().map((product, index) => (
        <DisplayProduct
          product={product}
          index={index}
          addtoCart={addToCart}
          cartProducts={cartProducts}
          goToCheckoutPage={goToCheckoutPage}
        />
      ))}
    </div>
  );
}
const mapStateToProps = state => {
  return {
    products: state.Reducer.products,
    cartProducts: state.Reducer.cartProducts
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateCartProducts: product => dispatch(updateStoreCartProducts(product))
  };
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default withConnect(Product);
