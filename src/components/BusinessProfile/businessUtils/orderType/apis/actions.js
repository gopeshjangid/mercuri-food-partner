import request from "../../../../../utils/api_client";
import AppConfig from "../../../../../utils/config";


export const ORDERTYPE_REQUEST = 'USERS_ORDERTYPE_REQUEST';
export const ORDERTYPE_SUCCESS = 'USERS_ORDERTYPE_SUCCESS';
export const ORDERTYPE_ERROR = 'USERS_ORDERTYPE_ERROR';
export const ORDERTYPE_RESET_ERROR = 'ORDERTYPE_RESET_ERROR';
export const ORDERTYPE_RESET_STATE = 'ORDERTYPE_RESET_STATE';

export const orderTypeError = error => {
  return {
    type: ORDERTYPE_ERROR,
    error: error
  };
};
export const orderTypeResetState = error => {
  return {
    type: ORDERTYPE_RESET_STATE
  };
};

export const orderTypeSuccess = orderType => {
  return {
    type: ORDERTYPE_SUCCESS,
    orderType: orderType
  };
};

export const orderTypeRequest = orderType => {
  return {
    type: ORDERTYPE_REQUEST,
    orderType: orderType
  };
};

export const resetError = () => {
  return {
    type: ORDERTYPE_RESET_ERROR
  };
}
export const getOrderTypeAction = (orderTypeData) => {
  return dispatch => {
    dispatch(orderTypeSuccess(orderTypeData));
  }
};

export const getMasterOrderTypes = (message) => {
  return request({
    method: 'get',
    url: AppConfig.API_URL + AppConfig.ENDPOINTS.MASTER.ORDER_TYPES,
  })
    .then(orderTypeData => {
      return orderTypeData.data.data;
    })
    .catch(error => {
      return error
    });
};

