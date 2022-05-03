import axios from 'axios';

import AppConfig from '../../../../utils/config';
import request from '../../../../utils/api_client';
import { ToastMessageContext } from '../../../../context/messageContext';
import { useContext } from 'react';

export const PARTNER_REQUEST = 'USERS_PARTNER_REQUEST';
export const PARTNER_SUCCESS = 'USERS_PARTNER_SUCCESS';
export const PARTNER_ERROR = 'USERS_PARTNER_ERROR';
export const PARTNER_RESET_ERROR = 'PARTNER_RESET_ERROR';
export const PARTNER_RESET_STATE = 'PARTNER_RESET_STATE';

export const partnerError = error => {
  return {
    type: PARTNER_ERROR,
    error: error
  };
};
export const partnerResetState = error => {
  return {
    type: PARTNER_RESET_STATE
  };
};

export const partnerSuccess = partner => {
  return {
    type: PARTNER_SUCCESS,
    partner: partner
  };
};

export const partnerRequest = partner => {
  return {
    type: PARTNER_REQUEST,
    partner: partner
  };
};

export const resetError = () => {
  return {
    type: PARTNER_RESET_ERROR
  };
}
export const getPartnerAction = (partnerData, message) => {

  return dispatch => {
    request({
      method: 'post',
      url: AppConfig.API_URL + AppConfig.ENDPOINTS.PARTNER_API_URL,
      data: { ...partnerData },
    })
      .then(partner => {
        dispatch(partnerSuccess({ ...partner.data, ...partnerData }));
        dispatch(getPartnerDetails(partnerData.userId, message))
        message?.showToastMessage({ message: 'Profile Updated Successfully', variant: 'success' })
        return partner.data;
      })
      .catch(error => {
        let errorMsg = '';
        if (error && error.message) errorMsg = error.message;
        dispatch(partnerError(errorMsg));
        message?.showToastMessage({ message: errorMsg || 'Something went wrong', variant: 'error' })
      });
  };
};

export const getPartnerDetails = (partnerData, message) => {
  return dispatch => {
    request({
      method: 'get',
      url: AppConfig.API_URL + AppConfig.ENDPOINTS.PARTNER_GET_API_URL + `/${partnerData}`,
    })
      .then(partner => {
        dispatch(partnerSuccess({ ...partner.data.data, ...partner.data.data.partner }));
        return partner.data;
      })
      .catch(error => {
        let errorMsg = '';
        if (error && error.response && error.response.data && error.response.data.message) errorMsg = error.response.data.message;
        dispatch(partnerError(errorMsg));
        message?.showToastMessage({ message: errorMsg, variant: 'error' })
      });
  };
};

export const getMasterPosTypes = (message) => {
  return dispatch => {
    request({
      method: 'get',
      url: AppConfig.API_URL + AppConfig.ENDPOINTS.MASTER.POS_TYPES,
    })
      .then(partner => {
        // dispatch(partnerSuccess({ ...partner.data.data, ...partner.data.data.partner }));
        return partner.data;
      })
      .catch(error => {
        let errorMsg = '';
        if (error && error.response && error.response.data && error.response.data.message) errorMsg = error.response.data.message;
        dispatch(partnerError(errorMsg));
        message?.showToastMessage({ message: errorMsg, variant: 'error' })
      });
  };
};

export const getMasterPartnerTypes = (message) => {
  return dispatch => {
    request({
      method: 'get',
      url: AppConfig.API_URL + AppConfig.ENDPOINTS.MASTER.PARTNER_TYPES,
    })
      .then(partner => {
        // dispatch(partnerSuccess({ ...partner.data.data, ...partner.data.data.partner }));
        return partner.data;
      })
      .catch(error => {
        let errorMsg = '';
        if (error && error.response && error.response.data && error.response.data.message) errorMsg = error.response.data.message;
        dispatch(partnerError(errorMsg));
        message?.showToastMessage({ message: errorMsg, variant: 'error' })
      });
  };
};

