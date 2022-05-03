import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_ERROR, LOGIN_RESET_ERROR, LOGIN_RESET_STATE } from './actions';


const initialState = {
  user: '',
  loginState: '0'
};
//Reset Login Error
const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_RESET_STATE:
      return {
        ...initialState
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loginState: '1',
        user: action.user,
        error: ''
      };
    case LOGIN_ERROR:
      return {
        ...state,
        loginState: '0',
        user: '',
        error: action.error
      };
    case LOGIN_REQUEST:
      return initialState;
    case LOGIN_RESET_ERROR:
      return {
        ...state,
        error: {}
      };
    default:
      return state;
  }
};

export const getUser = state => state.userLoginReducer;
export const getUserError = state => state.userLoginReducer.error;
export default loginReducer;

