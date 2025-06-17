import {Link} from 'react-router-dom'

import {Component} from 'react'

import Header from '../Header'

import CartContext from '../../context/CartContext'

import CartListView from '../CartListView'

import CartSummary from '../CartSummary'

import './index.css'

class Cart extends Component {
  render() {
    return (
      <CartContext.Consumer>
        {value => {
          const {cartList, removeAllCartItems} = value
          const cartListLength = cartList.length
          const onClickingRemoveAllBtn = () => {
            removeAllCartItems()
          }
          return (
            <div className='cart-bg-container'>
              <Header />
              <div className='cart-heading-remove-all-container'>
                <h1 className='my-cart-heading'>My Cart</h1>
                <button
                  type='button'
                  className='remove-all-btn'
                  onClick={onClickingRemoveAllBtn}
                >
                  Remove All
                </button>
              </div>

              {cartListLength > 0 ? (
                <div className='cart-content-container'>
                  <CartListView />
                  <div className='cart-summary-container'>
                   
                      <CartSummary />
                   
                  </div>
                </div>
              ) : (
                <>
                  <img src='https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png' />
                  <Link to='/'>
                    <button type='button' className='shop-now-btn'>
                      Shop Now
                    </button>
                  </Link>
                </>
              )}
            </div>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

export default Cart
