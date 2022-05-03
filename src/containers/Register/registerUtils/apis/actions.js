import axios from 'axios';
import { sha256 } from 'js-sha256';

import AppConfig from '../../../../utils/config';
import AppStorage from '../../../../utils/app.storage';
import ENUMS from '../../../../utils/enum';
import request from '../../../../utils/api_client';

export const REGISTER_REQUEST = 'USERS_REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'USERS_REGISTER_SUCCESS';
export const REGISTER_ERROR = 'USERS_REGISTER_ERROR';
export const REGISTER_RESET_ERROR = 'USERs_RESET_ERROR';

export const resetError = () => {
  return {
    type: REGISTER_RESET_ERROR
  };
};

export const registerError = error => {
  return {
    type: REGISTER_ERROR,
    error: error
  };
};

export const registerSuccess = user => {
  return {
    type: REGISTER_SUCCESS,
    user: user
  };
};

export const registerRequest = code => {
  return {
    type: REGISTER_REQUEST,
    code: code
  };
};

export const getRegisterAction = (data, router) => {
  return dispatch => {
    request({
      method: 'post',
      url: AppConfig.API_URL + AppConfig.ENDPOINTS.REGISTER_API_URL,
      data: {
        firstName: data.first_name,
        lastName: data.last_name,
        email: data.email,
        password: data.password ? sha256(data.password) : '',
        partnerName: data.restaurant_name
      }
    })
      .then(user => {
        dispatch(registerSuccess(user.data));
        dispatch(registerError(''));
        router.push(ENUMS.ROUTES.LOGIN);
        return user.data;
      })
      .catch(error => {
        let errorMsg = '';
        if (error && error.response && error.response.data && error.response.data.message) errorMsg = error.response.data.message;
        dispatch(registerError(errorMsg));
      });
  };
};
