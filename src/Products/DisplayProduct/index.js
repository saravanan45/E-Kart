import React from 'react';
import Mobile from '../../Img/Mobile.png';
import TShirt from '../../Img/t-shirt.png';
import Induction from '../../Img/induction.jpeg';
import Trimmer from '../../Img/trimmer.jpeg';

function DisplayProduct({
  product,
  index,
  addtoCart,
  cartProducts = [],
  goToCheckoutPage
}) {
  const image = () => {
    switch (product.Type) {
      case 'Mobile':
        return Mobile;
      case 'TShirt':
        return TShirt;
      case 'Trimmer':
        return Trimmer;
      case 'Induction':
        return Induction;
    }
  };
  const productAddedToCart = () => {
    const filteredProduct = cartProducts.filter(
      cart => cart.Name === product.Name
    );
    if (filteredProduct.length) {
      return true;
    }
    return false;
  };
  return (
    <div className="container display-product">
      <div className="product-image">
        <img src={image()} />
      </div>
      <div className="product-name-description-price">
        <div className="product-name">
          <span>{product.Name}</span>
        </div>
        <div className="product-description">
          <span>{product.Description}</span>
        </div>
        <div className="product-price-cart">
          <div className="product-price">
            <span>${product.Price}</span>
          </div>
          <div>
            {productAddedToCart() ? (
              <span className="indicator">Added to Cart</span>
            ) : (
              <button onClick={() => addtoCart(index)} className="cart-button">
                Add to cart
              </button>
            )}
          </div>
        </div>
      </div>
      {/* <button
        className="checkout-button"
        onClick={(product, index) => {
          goToCheckoutPage(product, index);
        }}
      >
        Checkout
      </button> */}
    </div>
  );
}
export default DisplayProduct;
