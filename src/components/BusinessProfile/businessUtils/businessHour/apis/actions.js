import request from "../../../../../utils/api_client";
import AppConfig from "../../../../../utils/config";
import { getPartnerDetails } from "../../apis/actions";

export const BUSINESSHOUR_REQUEST = 'USERS_BUSINESSHOUR_REQUEST';
export const BUSINESSHOUR_SUCCESS = 'USERS_BUSINESSHOUR_SUCCESS';
export const BUSINESSHOUR_ERROR = 'USERS_BUSINESSHOUR_ERROR';
export const BUSINESSHOUR_RESET_ERROR = 'BUSINESSHOUR_RESET_ERROR';
export const BUSINESSHOUR_RESET_STATE = 'BUSINESSHOUR_RESET_STATE';
export const BUSINESSHOUR_TEMPORARY_SUCCESS = 'BUSINESSHOUR_TEMPORARY_SUCCESS';

export const businessHourError = error => {
  return {
    type: BUSINESSHOUR_ERROR,
    error: error
  };
};
export const businessHourResetState = error => {
  return {
    type: BUSINESSHOUR_RESET_STATE
  };
};

export const businessHourSuccess = businessHour => {
  return {
    type: BUSINESSHOUR_SUCCESS,
    businessHour: businessHour
  };
};

export const businessHourRequest = businessHour => {
  return {
    type: BUSINESSHOUR_REQUEST,
    businessHour: businessHour
  };
};

export const resetError = () => {
  return {
    type: BUSINESSHOUR_RESET_ERROR
  };
}
export const getBusinessHourAction = (businessHourData) => {
  return dispatch => {
    dispatch(businessHourSuccess(businessHourData));
  }
};

export const businesstemporarySuccess = isTemporarilyClosed => {
  return {
    type: BUSINESSHOUR_TEMPORARY_SUCCESS,
    isTemporarilyClosed: isTemporarilyClosed
  };
};


export const markTemporaryClosed = (partnerData, closed, message) => {
  return dispatch => {
    request({
      method: 'post',
      url: AppConfig.API_URL + AppConfig.ENDPOINTS.PARTNER_API_URL,
      data: { ...partnerData, isTemporarilyClosed: closed },
    })
      .then(partner => {
        dispatch(getPartnerDetails(partnerData.user_id, message))
        message?.showToastMessage({ message: 'Profile Updated Successfully', variant: 'success' })
        return partner.data;
      })
      .catch(error => {
        let errorMsg = '';
        if (error && error.message) errorMsg = error.message;
        message?.showToastMessage({ message: errorMsg || 'Something went wrong', variant: 'error' })
      });
  };
};