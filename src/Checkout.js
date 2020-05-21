import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { db } from './Firebase';
import { updateStoreCartProducts } from './action';

const Checkout = ({ cartProducts = [], history, updateCartProducts }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [zipcode, setZipCode] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [CVV, setCVV] = useState('');
  const [error, setError] = useState('');

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
  const checkout = () => {
    if (
      !firstName &&
      !address1 &&
      !country &&
      !mobileNumber &&
      !state &&
      !zipcode &&
      !cardHolder &&
      !cardNumber &&
      !expirationDate &&
      !CVV
    ) {
      setError('Please fill all the details');
      return;
    }
    const { userId } = JSON.parse(localStorage.getItem('UserDetails'));

    db.ref('Users')
      .orderByChild('userId')
      .equalTo(userId)
      .once('value')
      .then(snapshot => {
        snapshot.forEach(childsnapshot =>
          childsnapshot.ref
            .update({
              orderedProducts: cartProducts,
              cartProducts: []
            })
            .then(() => console.log('order updated'))
        );
      });
    const cart = [];
    updateCartProducts(cart);
    localStorage.setItem('cartProducts', JSON.stringify(cart));
    history.push('/Success');
  };

  const CartDetails = () => {
    return (
      <div className="cart">
        <div className="product-details">
          <span className="col-xs-8 col-md-8 col-lg-8 col-xl-8">
            ProductName
          </span>
          <p className="col-xs-4 col-md-4 col-lg-4 col-xl-4">price</p>
        </div>
        {cartProducts.map(product => (
          <div className="product-cart">
            <span className="col-xs-8 col-md-8 col-lg-8 col-xl-8">
              {product.Name}
            </span>
            <p className="col-xs-4 col-md-4 col-lg-4 col-xl-4">
              ${product.Price}
            </p>
          </div>
        ))}
        <div className="col-xs-8 col-md-8 col-lg-8 col-xl-8">
          <div className="cart-price-checkout">Due Now</div>
        </div>
        <div className="col-xs-4 col-md-4 col-lg-4 col-xl-4">
          <div className="cart-price-value-checkout">${DueCalculate()}</div>
        </div>
      </div>
    );
  };
  return (
    <div className="container checkout-page">
      <div className="row">
        <div className="col-xs-12 col-md-8">
          {error ? <span className="error-field">{error}</span> : null}
          <div className="checkout-section-header">
            <span>Billing Address</span>
          </div>
          <div className="Checkout-user">
            <input
              className="FirstName-checkout"
              type="text"
              name="FirstName"
              placeholder="First Name"
              value={firstName}
              onChange={e => {
                setFirstName(e.target.value);
              }}
            />
            <input
              className="LastName-checkout"
              type="text"
              name="LastName"
              placeholder="Last Name"
              value={lastName}
              onChange={e => {
                setLastName(e.target.value);
              }}
            />
          </div>
          <input
            className="mobilenumber-checkout"
            type="number"
            name="phonenumber"
            placeholder="Mobile number"
            value={mobileNumber}
            onChange={e => {
              setMobileNumber(e.target.value);
            }}
          />
          <input
            className="address1-checkout"
            type="text"
            name="Address1"
            placeholder="Address 1"
            value={address1}
            onChange={e => {
              setAddress1(e.target.value);
            }}
          />
          <input
            className="address1-checkout"
            type="text"
            name="Address2"
            placeholder="Address 2"
            value={address2}
            onChange={e => {
              setAddress2(e.target.value);
            }}
          />
          <div className="country-details-checkout">
            <input
              className="country-checkout"
              type="text"
              name="country"
              placeholder="Country"
              value={country}
              onChange={e => {
                setCountry(e.target.value);
              }}
            />
            <input
              className="state-checkout"
              type="text"
              name="state"
              placeholder="state"
              value={state}
              onChange={e => {
                setState(e.target.value);
              }}
            />
            <input
              className="zip-checkout"
              type="text"
              name="Zip"
              placeholder="Zip"
              value={zipcode}
              onChange={e => {
                setZipCode(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="col-xs-12 col-md-4">
          <div className="cart-checkout">
            <div className="checkout-section-header-cart">
              <span>Cart</span>
            </div>
            <div className="cart-details">{CartDetails()}</div>
          </div>
        </div>
      </div>
      <div className="col-md-12">
        <div className="checkout-section-header">
          <span>Payment</span>
        </div>
      </div>
      <div>
        <input
          className="card-name"
          type="text"
          name="Cardholder"
          placeholder="Name on Card"
          value={cardHolder}
          onChange={e => {
            setCardHolder(e.target.value);
          }}
        />
        <input
          className="card-number"
          type="text"
          name="Card Number"
          placeholder="card Number"
          value={cardNumber}
          onChange={e => {
            setCardNumber(e.target.value);
          }}
        />
        <div>
          <input
            className="card-expiration"
            type="text"
            name="expiration"
            placeholder="expiration"
            value={expirationDate}
            onChange={e => {
              setExpirationDate(e.target.value);
            }}
          />
          <input
            className="card-cvv"
            type="text"
            name="CVV"
            placeholder="CVV"
            value={CVV}
            onChange={e => {
              setCVV(e.target.value);
            }}
          />
        </div>
      </div>

      <button
        className="button-checkout"
        onClick={() => {
          checkout();
        }}
      >
        Checkout
      </button>
    </div>
  );
};
const mapStateToProps = state => {
  return {
    cartProducts: state.Reducer.cartProducts
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateCartProducts: products => dispatch(updateStoreCartProducts(products))
  };
};
const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withForm = compose(withRouter, withConnect);
export default withForm(Checkout);
