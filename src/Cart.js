import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';

const Cart = ({
  cartProducts,
  displayCart,
  deleteCartProduct,
  goToCheckoutPage
}) => {
  const DueCalculate = () => {
    const priceArray = cartProducts.map(prod => {
      return prod.Price;
    });
    if (priceArray.length) {
      return priceArray.reduce(
        (accumulator, currentValue) => accumulator + currentValue
      );
    }
    return 0;
  };
  return (
    <div
      className="cart-overlay"
      onClick={() => {
        displayCart();
      }}
    >
      <div className="cart-container">
        <div className="cart-title">
          <span>Order Summary</span>
        </div>
        {cartProducts.map((product, index) => (
          <div className="cart-container-body">
            <div className="col-xs-8 col-md-8">
              <div className="cart-product-name">
                <span>{product.Name}</span>
              </div>
            </div>
            <div className="cart-product-price">
              <div className="col-xs-2 col-md-2">
                <span>${product.Price}</span>
              </div>
            </div>
            <div className="col-xs-2 col-md-2">
              <div
                className="trash-icon"
                onClick={() => {
                  deleteCartProduct(index);
                }}
              >
                <i class="fa fa-trash " aria-hidden="true"></i>
              </div>
            </div>
          </div>
        ))}
        <div className="col-xs-8 col-md-8 cart-due">
          <p>Due Now:</p>
        </div>
        <div className="col-xs-2 col-md-2 cart-price">${DueCalculate()}</div>
        <button
          className="checkout-button"
          onClick={() => {
            goToCheckoutPage();
          }}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};
const mapStateToProps = state => {
  return {
    cartProducts: state.Reducer.cartProducts
  };
};
const withConnect = connect(mapStateToProps, null);
const withCompose = compose(withConnect, withRouter);
export default withCompose(Cart);
