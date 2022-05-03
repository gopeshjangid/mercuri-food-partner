import axios from 'axios';
import { sha256 } from 'js-sha256';

import AppConfig from '../../../../utils/config';
import AppStorage from '../../../../utils/app.storage';
import ENUMS from '../../../../utils/enum';
import request from '../../../../utils/api_client';

export const LOGIN_REQUEST = 'USERS_LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'USERS_LOGIN_SUCCESS';
export const LOGIN_ERROR = 'USERS_LOGIN_ERROR';
export const LOGIN_RESET_ERROR = 'LOGIN_RESET_ERROR';
export const LOGIN_RESET_STATE = 'LOGIN_RESET_STATE';

export const loginError = error => {
  return {
    type: LOGIN_ERROR,
    error: error
  };
};
export const loginResetState = error => {
  return {
    type: LOGIN_RESET_STATE
  };
};

export const loginSuccess = user => {
  return {
    type: LOGIN_SUCCESS,
    user: user
  };
};

export const loginRequest = user => {
  return {
    type: LOGIN_REQUEST,
    user: user
  };
};

export const resetError = () => {
  return {
    type: LOGIN_RESET_ERROR
  };
};

export const getLoginAction = (userdata, router,message) => {
  return dispatch => {
    request({
      url: AppConfig.API_URL + AppConfig.ENDPOINTS.LOGIN_API_URL,
      method: 'post',
      data: {
        email: userdata.email,
        password: userdata.password ? sha256(userdata.password) : '',
      },
      handleHeaders: 1
    })
      .then(user => {
        dispatch(loginSuccess(user.data));
        router.push(ENUMS.ROUTES.ACCOUNT);
        return user.data;
      })
      .catch(error => {
        let errorMsg = '';
        if (error && error.message && error.message) errorMsg = error.message;
        dispatch(loginError(errorMsg));
        message?.showToastMessage({message: errorMsg, variant:ENUMS.VARIANT.ERROR})
      });
  };
};

export const logout = (router) => {
  return dispatch => {
    dispatch(loginResetState());
    AppStorage.clearLoginToken();
    router.replace('/login');
  };
};
