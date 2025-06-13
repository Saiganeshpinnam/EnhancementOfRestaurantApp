import {Link, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'

import {FiShoppingCart} from 'react-icons/fi'

import CartContext from '../../context/CartContext'

import './index.css'

const Header = props => {
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
              UNI Resto Cafe
            </Link>
            <div className='orders-cart-logout-container'>
              <Link to='/cart' className='cart-link-text'>
                Cart
              </Link>
              <div className='cart-image-order-count-container'>
                <span className='cart-count'>{cartItemsCount}</span>
                <FiShoppingCart className='cart-icon' />
              </div>
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
