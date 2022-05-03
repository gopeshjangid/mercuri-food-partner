import { SIDE_MENU_REQUEST, SIDE_MENU_SUCCESS, SIDE_MENU_ERROR, SIDE_MENU_RESET_ERROR, SIDE_MENU_RESET_STATE } from './actions';


const initialState = {
  sideMenu: [],
};


const sideMenuReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIDE_MENU_RESET_STATE:
      return {
        ...initialState
      };
    case SIDE_MENU_SUCCESS:
      return {
        ...state,
        sideMenu: [
          ...action.sideMenu
        ],
        error: ''
      };
    case SIDE_MENU_ERROR:
      return {
        ...state,
        sideMenu: [...state.sideMenu],
        error: action.error
      };
    case SIDE_MENU_REQUEST:
      return initialState;
    case SIDE_MENU_RESET_ERROR:
      return {
        ...state,
        error: {}
      };
    default:
      return state;
  }
};

export const getMenu = state => state.sideMenuReducer;
export const getMenuError = state => state.sideMenuReducer.error;
export default sideMenuReducer;

