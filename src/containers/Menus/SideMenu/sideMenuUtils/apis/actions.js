import axios from 'axios';

import AppConfig from '../../../../../utils/config';
import request from '../../../../../utils/api_client';
import ENUMS from '../../../../../utils/enum';

export const SIDE_MENU_REQUEST = 'SIDE_SIDE_MENU_REQUEST';
export const SIDE_MENU_SUCCESS = 'SIDE_MENU_SUCCESS';
export const SIDE_MENU_ERROR = 'SIDE_MENU_ERROR';
export const SIDE_MENU_RESET_ERROR = 'SIDE_MENU_RESET_ERROR';
export const SIDE_MENU_RESET_STATE = 'SIDE_MENU_RESET_STATE';

export const sideMenuError = error => {
  return {
    type: SIDE_MENU_ERROR,
    error: error
  };
};
export const sideMenuResetState = error => {
  return {
    type: SIDE_MENU_RESET_STATE
  };
};

export const sideMenuSuccess = sideMenu => {
  return {
    type: SIDE_MENU_SUCCESS,
    sideMenu: sideMenu
  };
};

export const sideMenuRequest = sideMenu => {
  return {
    type: SIDE_MENU_REQUEST,
    sideMenu: sideMenu
  };
};

export const resetError = () => {
  return {
    type: SIDE_MENU_RESET_ERROR
  };
}

export const successCallback = (type, id = null, messageContext) => {
  return messageContext?.showToastMessage({ message: `${type} ${id ? ENUMS.MESSAGE.UPDATED : ENUMS.MESSAGE.ADDED} ${ENUMS.MESSAGE.SUCCESSFULLY}`, variant: ENUMS.VARIANT.SUCCESS })
}
export const deleteCallback = (type, messageContext) => {
  return messageContext?.showToastMessage({ message: `${type} ${ENUMS.MESSAGE.DELETED}`, variant: ENUMS.VARIANT.SUCCESS })
}

export const errorCallback = (errorMsg, messageContext) => {
  return messageContext?.showToastMessage({ message: errorMsg ? errorMsg : ENUMS.MESSAGE.WENT_WORNG, variant: ENUMS.VARIANT.ERROR })
}

export const getSideMenuAction = (sideMenuData, message) => {
  const id = sideMenuData.id;
  return dispatch => {
    request({
      method: 'post',
      url: AppConfig.API_URL + AppConfig.ENDPOINTS.MENU.SAVE_SIDE_MENU,
      data: sideMenuData,
    })
      .then(sideMenu => {
        dispatch(getSideMenuDetails(sideMenuData.partnerId))
        successCallback('Menu', id, message);
        return sideMenu.data.data;
      })
      .catch(error => {
        let errorMsg = '';
        if (error && error.response && error.response.data && error.response.data.message) errorMsg = error.response.data.message;
        dispatch(sideMenuError(errorMsg));
        errorCallback(errorMsg, message)
      });
  };
};

export const getSideMenuDetails = (partnerId, message) => {
  return dispatch => {
    request({
      method: 'get',
      url: AppConfig.API_URL + AppConfig.ENDPOINTS.MENU.GET_MENU + `/sides?partnerId=${partnerId}`,
    })
      .then(sideMenu => {
        dispatch(sideMenuSuccess(sideMenu.data.data));
        return sideMenu.data.data;
      })
      .catch(error => {
        let errorMsg = '';
        if (error && error.response && error.response.data && error.response.data.message) errorMsg = error.response.data.message;
        dispatch(sideMenuError(errorMsg));
        errorCallback(errorMsg, message)
      });
  };
};

export const saveSideItem = (data, message) => {
  const id = data.id;
  return dispatch => {
    request({
      method: 'post',
      url: AppConfig.API_URL + AppConfig.ENDPOINTS.MENU.SAVE_SIDE_ITEM,
      data: data
    })
      .then(response => {
        if (response.data.data)
          dispatch(getSideMenuDetails(data.partnerId))
        successCallback('Item', id, message)
      })
      .catch(error => {
        let errorMsg = '';
        if (error && error.response && error.response.data && error.response.data.message) errorMsg = "Failed to update item";
        dispatch(sideMenuError(error));
        errorCallback(errorMsg, message)
      });
  };
};

export const deleteSide = (data, message) => {
  const id = data.id;
  return dispatch => {
    request({
      method: 'post',
      url: AppConfig.API_URL + AppConfig.ENDPOINTS.MENU.DELETE_SIDE,
      data: data
    })
      .then(response => {
        if (response.data.data)
          dispatch(getSideMenuDetails(data.partnerId))
        deleteCallback('Side', message)
      })
      .catch(error => {
        let errorMsg = '';
        if (error && error.response && error.response.data && error.response.data.message) errorMsg = "Failed to delete item";
        dispatch(sideMenuError(error));
        errorCallback(errorMsg, message)
      });
  };
};


export const deleteSideItem = (data, message) => {
  const id = data.id;
  return dispatch => {
    request({
      method: 'post',
      url: AppConfig.API_URL + AppConfig.ENDPOINTS.MENU.DELETE_SIDE_ITEM,
      data: data
    })
      .then(response => {
        if (response.data.data)
          dispatch(getSideMenuDetails(data.partnerId))
        deleteCallback('Item', message)
      })
      .catch(error => {
        let errorMsg = '';
        if (error && error.response && error.response.data && error.response.data.message) errorMsg = "Failed to update item";
        dispatch(sideMenuError(error));
        errorCallback(errorMsg, message)
      });
  };
};

