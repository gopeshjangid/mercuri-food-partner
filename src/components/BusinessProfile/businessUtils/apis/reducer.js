import { PARTNER_REQUEST, PARTNER_SUCCESS, PARTNER_ERROR, PARTNER_RESET_ERROR, PARTNER_RESET_STATE } from './actions';


const initialState = {
  partner: {},
};


const partnerReducer = (state = initialState, action) => {
  switch (action.type) {
    case PARTNER_RESET_STATE:
      return {
        ...initialState
      };
    case PARTNER_SUCCESS:
      return {
        ...state,
        partner: {
          ...state.partner,
          ...action.partner
        },
        error: ''
      };
    case PARTNER_ERROR:
      return {
        ...state,
        partner: {
          ...state.partner
        },
        error: action.error
      };
    case PARTNER_REQUEST:
      return initialState;
    case PARTNER_RESET_ERROR:
      return {
        ...state,
        error: {}
      };
    default:
      return state;
  }
};

export const getPartner = state => state.partnerReducer;
export const getPartnerError = state => state.partnerReducer.error;
export default partnerReducer;

