import { MENU_REQUEST, MENU_SUCCESS, MENU_ERROR, MENU_RESET_ERROR, MENU_RESET_STATE } from './actions';


const initialState = {
  menu: [],
};


const menuReducer = (state = initialState, action) => {
  switch (action.type) {
    case MENU_RESET_STATE:
      return {
        ...initialState
      };
    case MENU_SUCCESS:
      return {
        ...state,
        menu: [
          ...action.menu
        ],
        error: ''
      };
    case MENU_ERROR:
      return {
        ...state,
        menu: [...state.menu],
        error: action.error
      };
    case MENU_REQUEST:
      return initialState;
    case MENU_RESET_ERROR:
      return {
        ...state,
        error: {}
      };
    default:
      return state;
  }
};

export const getMenu = state => state.menuReducer;
export const getMenuError = state => state.menuReducer.error;
export default menuReducer;

