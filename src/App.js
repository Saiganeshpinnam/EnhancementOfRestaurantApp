import {Component} from 'react'

import {BrowserRouter, Switch, Route} from 'react-router-dom'

import CartContext from './context/CartContext'

import Home from './components/Home'

import Login from './components/Login'

import Cart from './components/Cart'

import ProtectedRoute from './components/ProtectedRoute'

import './App.css'

// write your code here
class App extends Component {
  state = {
    cartList: [],
    dishCount: {},
  }

  removeAllCartItems = () => {
    this.setState({
      cartList: [],
    })
  }

  incrementCartItemQuantity = id => {
    //  console.log(id)
    this.setState(prevState => ({
      cartList: prevState.cartList.map(item =>
        item.dish.dish_id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
              dishCount: {
                ...item.dishCount,
                [id]: (item.dishCount?.[id] || 1) + 1,
              },
            }
          : item,
      ),
    }))
  }

  decrementCartItemQuantity = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList
        .map(item =>
          item.dish.dish_id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
                dishCount: {
                  ...item.dishCount,
                  [id]: (item.dishCount?.[id] || 1) - 1,
                },
              }
            : item,
        )
        .filter(item => item.quantity > 0),
    }))
  }

  addCartItem = product => {
    // console.log(product)
    this.setState(prevState => {
      const existingItem = prevState.cartList.find(
        item => item.dish.dish_id === product.dish.dish_id,
      )
      if (existingItem) {
        return {
          cartList: prevState.cartList.map(item =>
            item.dish.dish_id === product.dish.dish_id
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                  dishCount: {
                    ...item.dishCount,
                    [product.dish.dish_id]:
                      (item.dishCount?.[product.dish.dish_id] || 1) + 1,
                  },
                }
              : item,
          ),
        }
      }
      return {
        cartList: [
          ...prevState.cartList,
          {...product, quantity: product.quantity || 1},
        ],
      }
    })
  }

  removeCartItem = id => {
    const {cartList} = this.state

    const cartItemsAfterDelete = cartList.filter(
      specificCartItem => specificCartItem.dish.dish_id !== id,
    )
    this.setState({
      cartList: cartItemsAfterDelete,
    })
  }

  render() {
    const {cartList} = this.state
    console.log(cartList)
    return (
      <CartContext.Provider
        value={{
          cartList,
          removeAllCartItems: this.removeAllCartItems,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <BrowserRouter>
          <Switch>
            <Route exact path='/login' component={Login} />
            <ProtectedRoute exact path='/' component={Home} />
            <ProtectedRoute exact path='/cart' component={Cart} />
          </Switch>
        </BrowserRouter>
      </CartContext.Provider>
    )
  }
}

export default App
