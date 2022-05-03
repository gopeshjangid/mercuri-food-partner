import { BRANDING_REQUEST, BRANDING_SUCCESS, BRANDING_ERROR, BRANDING_RESET_ERROR, BRANDING_RESET_STATE } from './actions';


const initialState = {
  branding: {

  },
};


const brandingReducer = (state = initialState, action) => {
  switch (action.type) {
    case BRANDING_RESET_STATE:
      return {
        ...initialState
      };
    case BRANDING_SUCCESS:
      return {
        ...state,
        branding: {
          ...state.branding,
          ...action.branding
        },
        error: ''
      };
    case BRANDING_ERROR:
      return {
        ...state,
        branding: '',
        error: action.error
      };
    case BRANDING_REQUEST:
      return initialState;
    case BRANDING_RESET_ERROR:
      return {
        ...state,
        error: {}
      };
    default:
      return state;
  }
};

export const getBranding = state => state.brandingReducer;
export const getBrandingError = state => state.brandingReducer.error;
export default brandingReducer;

