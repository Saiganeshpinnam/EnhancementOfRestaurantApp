import {Link} from 'react-router-dom'

import {FiShoppingCart} from 'react-icons/fi'

import CartContext from '../../context/CartContext'

import './index.css'

const Header = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      const cartItemsCount = cartList.length

      return (
        <div className="name-cart-container">
          <Link to="/" className="restaurant-name">
            UNI Resto Cafe
          </Link>
          <div className="orders-cart-container">
            <Link to="/cart" className="cart-link-text">
              Cart
            </Link>
            <div className="cart-image-order-count-container">
              <span className="cart-count">{cartItemsCount}</span>
              <FiShoppingCart className="cart-icon" />
            </div>
            <h1 className="my-orders-heading">My Orders</h1>
          </div>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default Header
