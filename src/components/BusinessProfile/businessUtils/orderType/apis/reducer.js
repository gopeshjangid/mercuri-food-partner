import { ORDERTYPE_REQUEST, ORDERTYPE_SUCCESS, ORDERTYPE_ERROR, ORDERTYPE_RESET_ERROR, ORDERTYPE_RESET_STATE } from './actions';


const initialState = {
  orderType: [],
};


const orderTypeReducer = (state = initialState, action) => {
  switch (action.type) {
    case ORDERTYPE_RESET_STATE:
      return {
        ...initialState
      };
    case ORDERTYPE_SUCCESS:
      return {
        ...state,
        orderType: action.orderType,
        error: ''
      };
    case ORDERTYPE_ERROR:
      return {
        ...state,
        orderType: [],
        error: action.error
      };
    case ORDERTYPE_REQUEST:
      return initialState;
    case ORDERTYPE_RESET_ERROR:
      return {
        ...state,
        error: {}
      };
    default:
      return state;
  }
};

export const getOrderType = state => state.orderTypeReducer;
export const getOrderTypeError = state => state.orderTypeReducer.error;
export default orderTypeReducer;

