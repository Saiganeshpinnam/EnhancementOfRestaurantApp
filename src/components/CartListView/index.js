import {Component} from 'react'

import CartContext from '../../context/CartContext'

import CartItem from '../CartItem'

import './index.css'

class cartListView extends Component {
  render() {
    return (
      <CartContext.Consumer>
        {value => {
          const {cartList} = value

          return (
            <ul className='cart-items-container'>
              {cartList.map(eachCartItem => (
                <CartItem
                  eachCartItem={eachCartItem}
                  key={eachCartItem.dish.dish_id}
                />
              ))}
            </ul>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

export default cartListView
