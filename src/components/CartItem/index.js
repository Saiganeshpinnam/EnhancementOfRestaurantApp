import {Component} from 'react'

import {BsPlus} from 'react-icons/bs'

import {AiOutlineMinus} from 'react-icons/ai'

import CartContext from '../../context/CartContext'

import './index.css'

class CartItem extends Component {
  render() {
    const {eachCartItem} = this.props
    console.log(eachCartItem)
    const formattedData = {
      dishId: eachCartItem.dish.dish_id,
      dishName: eachCartItem.dish.dish_name,
      dishImage: eachCartItem.dish.dish_image,
      quantity: eachCartItem.quantity,
    }

    return (
      <CartContext.Consumer>
        {value => {
          const {
            incrementCartItemQuantity,
            decrementCartItemQuantity,
            cartList,
          } = value

          const onClickingIncreaseCartItem = id => {
            //  console.log(id)
            incrementCartItemQuantity(id)
          }
          const onClickingDecreaseCartItem = id => {
            decrementCartItemQuantity(id)
          }
          return (
            <li key={formattedData.dishId} className='each-cart-item'>
              <div className='dish-image-name-container'>
                <img
                  src={formattedData.dishImage}
                  className='dish-item-image'
                  alt={formattedData.dishName}
                />
                <p className='dish-item-name'>{formattedData.dishName}</p>
              </div>
              <div className='increase-decrease-cart-count-container'>
                <button
                  type='button'
                  className='cart-count-btn'
                  onClick={() =>
                    onClickingIncreaseCartItem(formattedData.dishId)
                  }
                >
                  <BsPlus />
                </button>
                <p className='cart-item-quantity'>
                  {eachCartItem.dishCount[formattedData.dishId]}
                </p>
                <button
                  type='button'
                  className='cart-count-btn'
                  onClick={() =>
                    onClickingDecreaseCartItem(formattedData.dishId)
                  }
                >
                  <AiOutlineMinus />
                </button>
              </div>
            </li>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

export default CartItem
// console.log(cartList.map(eachItem => eachItem.dishCount[eachItem.dish.dish_id]))
