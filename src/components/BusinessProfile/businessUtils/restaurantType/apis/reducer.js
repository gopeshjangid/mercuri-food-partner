import { RESTAURANT_TYPE_REQUEST, RESTAURANT_TYPE_SUCCESS, RESTAURANT_TYPE_ERROR, RESTAURANT_TYPE_RESET_ERROR, RESTAURANT_TYPE_RESET_STATE } from './actions';


const initialState = {
  restaurantType: [],
};


const restaurantTypeReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESTAURANT_TYPE_RESET_STATE:
      return {
        ...initialState
      };
    case RESTAURANT_TYPE_SUCCESS:
      return {
        ...state,
        restaurantType: action.RESTAURANT_TYPE,
        error: ''
      };
    case RESTAURANT_TYPE_ERROR:
      return {
        ...state,
        restaurantType: [],
        error: action.error
      };
    case RESTAURANT_TYPE_REQUEST:
      return initialState;
    case RESTAURANT_TYPE_RESET_ERROR:
      return {
        ...state,
        error: {}
      };
    default:
      return state;
  }
};

export const getRestaurantType = state => state.restaurantTypeReducer;
export const getRestaurantTypeError = state => state.restaurantTypeReducer.error;
export default restaurantTypeReducer;

