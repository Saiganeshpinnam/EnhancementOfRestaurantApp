import {Component} from 'react'

import Header from '../Header'

import CartContext from '../../context/CartContext'

import CartListView from '../CartListView'

import './index.css'

class Cart extends Component {
  render() {
    return (
      <CartContext.Consumer>
        {value => {
          const {cartList, removeAllCartItems} = value
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
              <div className='cart-content-container'>
                <CartListView />
              </div>
            </div>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

export default Cart
