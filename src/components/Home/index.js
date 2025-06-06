import {Component} from 'react'

import Loader from 'react-loader-spinner'

import Header from '../Header'

import CartContext from '../../context/CartContext'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}
class Home extends Component {
  state = {
    restaurantData: [],
    selectedDishes: [],
    dishCount: {},
    cartCount: 0,
    activeCategoryId: '',
    apiStatus: apiStatusConstants.initial,
    dishData: {},
    quantity: 1,
  }

  componentDidMount() {
    this.getRestaurantDishesData()
  }

  getRestaurantDishesData = async () => {
    const response = await fetch(
      'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details',
    )
    if (response.ok === true) {
      const data = await response.json()
      // console.log(
      //   data[0].table_menu_list.map(eachMenu =>
      //     eachMenu.category_dishes.map(
      //       eachCategoryDish => eachCategoryDish.dish_id,
      //     ),
      //   ),
      // )

      const formattedData = data.map(eachItem => ({
        restaurantId: eachItem.restaurant_id,
        restaurantName: eachItem.restaurant_name,
        restaurantImage: eachItem.restaurant_image,
        tableId: eachItem.table_id,
        tableName: eachItem.table_name,
        branchName: eachItem.branch_name,
        nextUrl: eachItem.nexturl,
        tableMenuList: eachItem.table_menu_list,
        dishId: data[0].table_menu_list.map(eachMenu =>
          eachMenu.category_dishes.map(
            eachCategoryDish => eachCategoryDish.dish_id,
          ),
        ),
      }))
      const firstCategory =
        formattedData.length > 0 && formattedData[0].tableMenuList.length > 0
          ? formattedData[0].tableMenuList[0]
          : null
      this.setState({
        restaurantData: formattedData,
        selectedDishes: firstCategory ? firstCategory.category_dishes : [],
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  onClickingMenuCategory = id => {
    const {restaurantData, activeCategoryId} = this.state

    const tableMenuList =
      restaurantData.length > 0 ? restaurantData[0].tableMenuList : []
    const selectedCategory = tableMenuList.find(
      eachCategory => eachCategory.menu_category_id === id,
    )

    if (selectedCategory) {
      this.setState({
        selectedDishes: selectedCategory.category_dishes,
        activeCategoryId: id,
      })
    }
  }

  onDecreaseDishCount = id => {
    this.setState(prevState => {
      const currentCount = prevState.dishCount[id] || 1
      if (currentCount > 0) {
        return {
          dishCount: {
            ...prevState.dishCount,
            [id]: currentCount - 1,
          },
          cartCount: prevState.cartCount - 1,
        }
      }
      return null
    })
  }

  onIncreaseDishCount = id => {
    this.setState(prevState => ({
      dishCount: {
        ...prevState.dishCount,
        [id]: (prevState.dishCount[id] || 1) + 1,
      },
      cartCount: prevState.cartCount + 1,
    }))
  }

  renderRestaurantData = () => {
    const {restaurantData, selectedDishes, cartCount, activeCategoryId} =
      this.state

    const tableMenuList =
      restaurantData.length > 0 ? restaurantData[0].tableMenuList : []

    return (
      <CartContext.Consumer>
        {value => {
          const {dishData, quantity, dishCount} = this.state
          const {
            dishId,
            dishName,
            dishAvailability,
            dishType,
            dishCalories,
            dishCurrency,
            dishDescription,
            dishImage,
            dishPrice,
          } = dishData

          const {addCartItem} = value
          const onClickingAddToCartBtn = dish => {
            addCartItem({...dishData, dish, dishCount})
          }
          return (
            <div className='restaurant-bg-container'>
              <Header />
              <ul className='tabs-container'>
                {tableMenuList.map(eachTab => {
                  const isActiveCategory =
                    activeCategoryId === eachTab.menu_category_id
                  const activeCategoryClassName = isActiveCategory
                    ? 'category-btn each-tab-text active-category-tab'
                    : 'category-btn each-tab-text'
                  return (
                    <li key={eachTab.menu_category_id}>
                      <button
                        type='button'
                        onClick={() =>
                          this.onClickingMenuCategory(eachTab.menu_category_id)
                        }
                        className={activeCategoryClassName}
                      >
                        {eachTab.menu_category}
                      </button>
                    </li>
                  )
                })}
              </ul>
              <ul className='dishes-container'>
                {selectedDishes.map(dish => (
                  <li className='dish-container' key={dish.dish_id}>
                    <div className='dish-type-name-container'>
                      {dish.dish_Type === 1 ? (
                        <div className='dish-type-one-container'>
                          <div className='dish-type-one' />
                        </div>
                      ) : (
                        <div className='dish-type-two-container'>
                          <div className='dish-type-two' />
                        </div>
                      )}

                      <div className='dish-text-info-container'>
                        <p className='dish-name'>{dish.dish_name}</p>

                        <div className='dish-currency-price-container'>
                          <p className='dish-currency'>
                            {dish.dish_currency} {dish.dish_price}
                          </p>
                        </div>
                        <p className='dish-description'>
                          {dish.dish_description}
                        </p>

                        {dish.dish_Availability && (
                          <div className='add-to-cart-item-container'>
                            <div className='add-remove-cart-container'>
                              <button
                                type='button'
                                className='increase-decrease-btn'
                                onClick={() =>
                                  this.onDecreaseDishCount(dish.dish_id)
                                }
                              >
                                -
                              </button>
                              <p className='dish-count'>
                                {dishCount[dish.dish_id] || 1}
                              </p>
                              <button
                                type='button'
                                className='increase-decrease-btn'
                                onClick={() =>
                                  this.onIncreaseDishCount(dish.dish_id)
                                }
                              >
                                +
                              </button>
                            </div>

                            <button
                              type='button'
                              className='add-to-cart-btn'
                              onClick={() => onClickingAddToCartBtn(dish)}
                            >
                              Add to Cart
                            </button>
                          </div>
                        )}
                        {dish.addonCat.length > 0 && (
                          <p className='customization-availability'>
                            Customizations available
                          </p>
                        )}
                        {!dish.dish_Availability && (
                          <p className='no-available-status'>Not available</p>
                        )}
                      </div>
                    </div>
                    <div className='calories-image-container'>
                      <p className='dish-calories'>
                        {dish.dish_calories} calories
                      </p>
                      <img
                        src={dish.dish_image}
                        className='dish-image'
                        alt={dish.dish_name}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )
        }}
      </CartContext.Consumer>
    )
  }

  renderFailureView = () => (
    <div className='failure-container'>
      <img
        src='https://res.cloudinary.com/dccbkv07a/image/upload/v1748416691/error-404-unavailable-web-page-file-not-found-business-concept-vector-illustration-PRD1N0_o4qhxj.jpg'
        className='failure-image'
        alt='not found'
      />
    </div>
  )

  renderLoadingView = () => (
    <div className='dishes-loader-container'>
      <Loader type='ThreeDots' color='#0b69ff' height='50' width='50' />
    </div>
  )

  render() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderRestaurantData()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }
}

export default Home
