import React, { useEffect, useState } from 'react';
import logo from './Img/logo.png';
import { withRouter } from 'react-router-dom';
import { auth, db } from './Firebase/index';
import Product from './Products/index';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Cart from './Cart';
import { updateStoreCartProducts, updateStoreProducts } from './action';

function Home({
  history,
  cartProducts,
  updateCartProducts,
  products,
  updateAllProducts
}) {
  const [userName, setUserName] = useState('');
  const [cartVisible, setCartVisible] = useState(false);
  const [searchProduct, setSearchProduct] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [productsList, setProducts] = useState(products || []);
  const [isloggedIn, setToLogIn] = useState(false);
  const [cartList, setCartList] = useState([]);

  useEffect(() => {
    getUserName();
    getProducts();
  }, []);

  const getProducts = () => {
    let Products = [];
    if (products.length) {
      return;
    }
    db.ref('Products').on('value', snapshot => {
      snapshot.forEach(childSnapshot => {
        let child = childSnapshot.val();
        Products.push(child);
      });
      updateAllProducts(Products);
      localStorage.setItem('Products', JSON.stringify(Products));
      setProducts(Products);
    });
  };

  const getUserName = () => {
    const { email = '', userId = '' } =
      JSON.parse(localStorage.getItem('UserDetails')) || [];
    if (email && userId) {
      db.ref('Users')
        .orderByChild('email')
        .equalTo(email)
        .once('value')
        .then(function(snapshot) {
          snapshot.forEach(function(childSnapshot) {
            var childData = childSnapshot.val();
            if (childData) {
              setUserName(childData.userName);
              localStorage.setItem('UserDetails', JSON.stringify(childData));
              if (childData.cartProducts && childData.cartProducts.length) {
                updateCartProducts(childData.cartProducts);
                setCartList(childData.cartProducts);
                localStorage.setItem(
                  'cartProducts',
                  JSON.stringify(childData.cartProducts)
                );
              }
            }
          });
        })
        .catch(error => console.log(error));
    }
  };

  const goToLogin = () => {
    history.push('/Login');
  };

  const displayCart = () => {
    setCartVisible(!cartVisible);
  };

  const updateDBCartProducts = cart => {
    const userDetails = JSON.parse(localStorage.getItem('UserDetails'));
    const { userId } = userDetails;
    db.ref('Users')
      .orderByChild('userId')
      .equalTo(userId)
      .once('value')
      .then(function(snapshot) {
        snapshot.forEach(child => {
          child.ref
            .update({ cartProducts: cart })
            .then(() => console.log('success'));
        });
        return true;
      });
  };

  const goToOrderedProducts = () => {
    history.push('/ViewOrders');
  };
  const deleteCartProduct = deleteIndex => {
    const filteredProducts = cartProducts.filter(
      (prod, index) => index !== deleteIndex
    );
    updateDBCartProducts(filteredProducts);
    localStorage.setItem('cartProducts', JSON.stringify(filteredProducts));
    updateCartProducts(filteredProducts);
  };

  const updateSearchProduct = event => {
    event.preventDefault();
    const filteredProducts = products.filter(
      prod =>
        prod.Type.toLocaleLowerCase() == searchProduct.toLocaleLowerCase() ||
        prod.Name.toLocaleLowerCase() == searchProduct.toLocaleLowerCase()
    );
    setFilteredProducts(filteredProducts);
    return;
  };

  const goToLoginButton = () => {
    setToLogIn(true);
    console.log(isloggedIn);
    setTimeout(function() {
      setToLogIn(false);
    }, 1000);
    console.log(isloggedIn);
  };

  const logout = () => {
    localStorage.clear();
    window.location.reload();
    history.push('/');
  };

  const goToCheckoutPage = () => {
    history.push('/checkout');
  };

  return (
    <div className="home-view">
      <div className="home-view-header">
        <img className="logo" src={logo} />
        <span className="site-title">Bascart !</span>
        <form
          onSubmit={e => {
            updateSearchProduct(e);
          }}
        >
          <input
            className="search-bar"
            type="text"
            autoComplete="off"
            name="search-bar"
            value={searchProduct}
            onChange={e => {
              setSearchProduct(e.target.value);
            }}
          ></input>
          <button
            className="search-button"
            onClick={e => updateSearchProduct(e)}
          >
            <i class="fa fa-search"></i>
          </button>
        </form>
        {userName ? (
          <div className="userName-field">
            <span>{userName}</span>
            <div class="dropdown-logout">
              <a
                onClick={() => {
                  goToOrderedProducts();
                }}
              >
                View Orders
              </a>
              <a
                onClick={() => {
                  logout();
                }}
              >
                Logout
              </a>
            </div>
          </div>
        ) : (
          <button
            className={`login-button${isloggedIn ? '-shake-button' : ''}`}
            onClick={() => {
              goToLogin();
            }}
          >
            Login
          </button>
        )}

        <div
          className="shopping-cart-img"
          onClick={() => {
            displayCart();
          }}
        >
          <i class="fa fa-shopping-cart fa-3x"></i>

          {cartProducts ? <span>{cartProducts.length} items</span> : null}
        </div>
      </div>
      {cartVisible ? (
        <Cart
          displayCart={displayCart}
          deleteCartProduct={deleteCartProduct}
          goToCheckoutPage={goToCheckoutPage}
        />
      ) : null}
      <Product
        filteredProducts={filteredProducts}
        productsList={productsList}
        userName={userName}
        goToLoginButton={goToLoginButton}
        updateDBCartProducts={updateDBCartProducts}
        goToCheckoutPage={goToCheckoutPage}
      />
    </div>
  );
}

const mapStateToProps = state => {
  return {
    cartProducts: state.Reducer.cartProducts,
    products: state.Reducer.products
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateAllProducts: products => dispatch(updateStoreProducts(products)),
    updateCartProducts: products => dispatch(updateStoreCartProducts(products))
  };
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect, withRouter)(Home);
