import { REGISTER_ERROR, REGISTER_SUCCESS, REGISTER_REQUEST, REGISTER_RESET_ERROR } from './actions';

const initialState = {
  loginState: '0'
};
const registerReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return {
        loginState: '1',
        message: action.user
      };
    case REGISTER_ERROR:
      return {
        ...state,
        loginState: '0',
        error: action && action.error
      };
    case REGISTER_REQUEST:
      return { code: action.code };
    case REGISTER_RESET_ERROR:
      return {
        ...state,
        error: {}
      };
    default:
      return state;
  }
};

export const getRegister = state => state.userRegisterReducer;
export const getRegisterError = state => state.userRegisterReducer.error;

export default registerReducer;
