import React, { Fragment } from 'react';

const OrderPlaced = ({ history }) => {
  const goToHome = () => {
    history.push('/');
  };
  return (
    <Fragment>
      <span className="order-placed">Your Order is successfully placed!</span>
      <button
        className="button-field"
        onClick={() => {
          goToHome();
        }}
      >
        Go To Home!
      </button>
    </Fragment>
  );
};
export default OrderPlaced;
