import request from "../../../../../utils/api_client";
import AppConfig from "../../../../../utils/config";


export const RESTAURANT_TYPE_REQUEST = 'USERS_RESTAURANT_TYPE_REQUEST';
export const RESTAURANT_TYPE_SUCCESS = 'USERS_RESTAURANT_TYPE_SUCCESS';
export const RESTAURANT_TYPE_ERROR = 'USERS_RESTAURANT_TYPE_ERROR';
export const RESTAURANT_TYPE_RESET_ERROR = 'RESTAURANT_TYPE_RESET_ERROR';
export const RESTAURANT_TYPE_RESET_STATE = 'RESTAURANT_TYPE_RESET_STATE';

export const RESTAURANT_TYPEError = error => {
  return {
    type: RESTAURANT_TYPE_ERROR,
    error: error
  };
};
export const RESTAURANT_TYPEResetState = error => {
  return {
    type: RESTAURANT_TYPE_RESET_STATE
  };
};

export const RESTAURANT_TYPESuccess = RESTAURANT_TYPE => {
  return {
    type: RESTAURANT_TYPE_SUCCESS,
    RESTAURANT_TYPE: RESTAURANT_TYPE
  };
};

export const RESTAURANT_TYPERequest = RESTAURANT_TYPE => {
  return {
    type: RESTAURANT_TYPE_REQUEST,
    RESTAURANT_TYPE: RESTAURANT_TYPE
  };
};

export const resetError = () => {
  return {
    type: RESTAURANT_TYPE_RESET_ERROR
  };
}
export const getRestaurantTypeAction = (RESTAURANT_TYPEData) => {
  return dispatch => {
    dispatch(RESTAURANT_TYPESuccess(RESTAURANT_TYPEData));
  }
};

export const getMasterRestaurantTypes = (message) => {
  return request({
    method: 'get',
    url: AppConfig.API_URL + AppConfig.ENDPOINTS.MASTER.PARTNER_TYPES,
  })
    .then(RESTAURANT_TYPEData => {
      return RESTAURANT_TYPEData.data.data;
    })
    .catch(error => {
      return error
    });
};

