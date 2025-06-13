import CartContext from '../../context/CartContext'

import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      const cartTotal = cartList
        .map(
          eachCartItem =>
            eachCartItem.dish.dish_price *
            eachCartItem.dishCount[eachCartItem.dish.dish_id],
        )
        .reduce((sum, itemTotal) => sum + itemTotal, 0)
      return (
        <div className='summary-content-container'>
          <h1 className='order-total-heading'>
            Order Total:
            <span className='cart-amount-value'> Rs {cartTotal}/-</span>
          </h1>
          <p className='cart-items-count'>{cartList.length} Items in cart</p>
          <button type='button' className='checkout-button'>
            Checkout
          </button>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
