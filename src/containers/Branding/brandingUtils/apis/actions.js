import axios from 'axios';

import AppConfig from '../../../../utils/config';
import request from '../../../../utils/api_client';
import { getPartnerAction } from '../../../../components/BusinessProfile/businessUtils/apis/actions'
import ENUMS from '../../../../utils/enum';

export const BRANDING_REQUEST = 'USERS_BRANDING_REQUEST';
export const BRANDING_SUCCESS = 'USERS_BRANDING_SUCCESS';
export const BRANDING_ERROR = 'USERS_BRANDING_ERROR';
export const BRANDING_RESET_ERROR = 'BRANDING_RESET_ERROR';
export const BRANDING_RESET_STATE = 'BRANDING_RESET_STATE';

export const brandingError = error => {
  return {
    type: BRANDING_ERROR,
    error: error
  };
};
export const brandingResetState = error => {
  return {
    type: BRANDING_RESET_STATE
  };
};

export const brandingSuccess = branding => {
  return {
    type: BRANDING_SUCCESS,
    branding: branding
  };
};

export const setBrandingColor = brandColor => {
  return {
    type: BRANDING_SUCCESS,
    branding: {
      brandColor
    }
  }
}

export const setSimplifiedName = simplifiedName => {
  return {
    type: BRANDING_SUCCESS,
    branding: {
      simplifiedName
    }
  }
}

export const brandingRequest = branding => {
  return {
    type: BRANDING_REQUEST,
    branding: branding
  };
};

export const resetError = () => {
  return {
    type: BRANDING_RESET_ERROR
  };
}
export const getBrandingAction = (brandingData, message) => {

  let formData = new FormData()
  formData.append('coverImage', brandingData.coverPhoto[0]);
  formData.append('profileImage', brandingData.profilePhoto[0]);

  return dispatch => {
    request({
      method: 'post',
      headers: {
        'Content-Type': 'application / x - www - form - urlencoded'
      },
      url: AppConfig.API_URL + AppConfig.ENDPOINTS.BRANDING_UPLOAD_URL,
      data: formData,
    })
      .then(branding => {
        dispatch(brandingSuccess(branding.data.data));
        dispatch(setBrandingColor(brandingData.brandColor));
        dispatch(setSimplifiedName(brandingData.simplifiedName))
        message?.showToastMessage({ message: `Branding ${ENUMS.MESSAGE.UPDATED} ${ENUMS.MESSAGE.SUCCESSFULLY}`, variant: ENUMS.VARIANT.SUCCESS });
        try {
          dispatch(getPartnerAction({
            ...brandingData.partner,
            ...branding.data.data,
            ...brandingData
          }))
        } catch (error) {
        }
        return branding.data;
      })
      .catch(error => {
        let errorMsg = '';
        if (error && error.response && error.response.data && error.response.data.message) errorMsg = error.response.data.message;
        dispatch(brandingError(errorMsg));
        message?.showToastMessage({ message: errorMsg ? errorMsg : ENUMS.MESSAGE.WENT_WORNG, variant: ENUMS.VARIANT.ERROR });
      });
  };
};
