import React, { useState, useEffect } from 'react';
import { db } from './Firebase';

const ViewOrders = () => {
  const [Orders, setOrders] = useState('');
  useEffect(() => {
    getOrderDetails();
  });
  const getOrderDetails = () => {
    const { userId } = JSON.parse(localStorage.getItem('UserDetails')) || [];
    db.ref('Users')
      .orderByChild('userId')
      .equalTo(userId)
      .once('value')
      .then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          const details = childSnapshot.val();
          console.log(details);
          let { orderedProducts } = details;
          setOrders(orderedProducts);
        });
      });
  };
  return (
    <div className="container view-orders">
      <div className="Orderlist-header">Order Summary</div>
      {Orders && Orders.length ? (
        Orders.map(product => (
          <div className="prod-list">
            <div className="col-xs-8">{product.Name}</div>
            <div className="col-xs-4">${product.Price}</div>
          </div>
        ))
      ) : (
        <div className="prod-list">You have 0 Orders</div>
      )}
    </div>
  );
};
export default ViewOrders;
