import {Link, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'

import {FiShoppingCart} from 'react-icons/fi'

import CartContext from '../../context/CartContext'

import './index.css'

const Header = props => {
  const {restaurantName} = props
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  return (
    <CartContext.Consumer>
      {value => {
        const {cartList} = value
        const cartItemsCount = cartList.length

        return (
          <div className='name-cart-container'>
            <Link to='/' className='restaurant-name'>
              {restaurantName}
            </Link>
            <div className='orders-cart-logout-container'>
              <p className='cart-link-text'>Cart</p>
              <Link to='/cart' className='cart-link-text'>
                <div className='cart-image-order-count-container'>
                  <span className='cart-count'>{cartItemsCount}</span>
                  <FiShoppingCart className='cart-icon' />
                </div>
              </Link>
              <h1 className='my-orders-heading'>My Orders</h1>
              <button
                type='button'
                className='logout-btn'
                onClick={onClickLogout}
              >
                Logout
              </button>
            </div>
          </div>
        )
      }}
    </CartContext.Consumer>
  )
}

export default withRouter(Header)
//UNI Resto Cafe
