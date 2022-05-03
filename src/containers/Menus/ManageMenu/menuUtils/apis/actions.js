import axios from 'axios';

import AppConfig from '../../../../../utils/config';
import request from '../../../../../utils/api_client';
import ENUMS from '../../../../../utils/enum';

export const MENU_REQUEST = 'MENU_REQUEST';
export const MENU_SUCCESS = 'MENU_SUCCESS';
export const MENU_ERROR = 'MENU_ERROR';
export const MENU_RESET_ERROR = 'MENU_RESET_ERROR';
export const MENU_RESET_STATE = 'MENU_RESET_STATE';

export const menuError = error => {
  return {
    type: MENU_ERROR,
    error: error
  };
};
export const menuResetState = error => {
  return {
    type: MENU_RESET_STATE
  };
};

export const menuSuccess = menu => {
  return {
    type: MENU_SUCCESS,
    menu: menu
  };
};

export const menuRequest = menu => {
  return {
    type: MENU_REQUEST,
    menu: menu
  };
};

export const resetError = () => {
  return {
    type: MENU_RESET_ERROR
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

export const getMenuAction = (menuData, message) => {
  const id = menuData.id;
  return dispatch => {
    request({
      method: 'post',
      url: AppConfig.API_URL + AppConfig.ENDPOINTS.MENU.SAVE_MENU,
      data: menuData,
    })
      .then(menu => {
        dispatch(getMenuDetails(menuData.partnerId))
        successCallback('Menu', id, message);
        return menu.data.data;
      })
      .catch(error => {
        let errorMsg = '';
        if (error && error.response && error.response.data && error.response.data.message) errorMsg = error.response.data.message;
        dispatch(menuError(errorMsg));
        errorCallback(errorMsg, message)
      });
  };
};


export const getMenuDetails = (partnerId, message) => {
  return dispatch => {
    request({
      method: 'get',
      url: AppConfig.API_URL + AppConfig.ENDPOINTS.MENU.GET_MENU + `/details?partnerId=${partnerId}`,
    })
      .then(menu => {
        dispatch(menuSuccess(menu.data.data));
        return menu.data.data;
      })
      .catch(error => {
        let errorMsg = '';
        if (error && error.response && error.response.data && error.response.data.message) errorMsg = error.response.data.message;
        dispatch(menuError(errorMsg));
        errorCallback(errorMsg, message)
      });
  };
};

export const updateCategory = (data, message) => {
  const id = data.id;
  return dispatch => {
    request({
      method: 'post',
      url: AppConfig.API_URL + AppConfig.ENDPOINTS.MENU.SAVE_CATEGORY,
      data: data
    })
      .then(response => {
        if (response.data.data)
          dispatch(getMenuDetails(data.partnerId))
        successCallback('Category', id, message)
      })
      .catch(error => {
        let errorMsg = '';
        if (error && error.response && error.response.data && error.response.data.message) errorMsg = "Failed to update catetory";
        dispatch(menuError(errorMsg));
        errorCallback(errorMsg, message)
      });
  };
};

export const saveItem = (data, message) => {
  const id = data.id;
  return dispatch => {
    request({
      method: 'post',
      url: AppConfig.API_URL + AppConfig.ENDPOINTS.MENU.SAVE_ITEM,
      data: data
    })
      .then(response => {
        if (response.data.data)
          dispatch(getMenuDetails(data.partnerId))
        successCallback('Item', id, message)
      })
      .catch(error => {
        let errorMsg = '';
        if (error && error.response && error.response.data && error.response.data.message) errorMsg = "Failed to update item";
        dispatch(menuError(error));
        errorCallback(errorMsg, message)
      });
  };
};

export const deleteMenu = (data, message) => {
  return dispatch => {
    request({
      method: 'post',
      url: AppConfig.API_URL + AppConfig.ENDPOINTS.MENU.DELETE_MENU,
      data: data
    })
      .then(response => {
        dispatch(getMenuDetails(data.partnerId))
        deleteCallback('Menu', message)
      })
      .catch(error => {
        let errorMsg = '';
        if (error && error.response && error.response.data && error.response.data.message) errorMsg = "Failed to update item";
        dispatch(menuError(errorMsg));
        errorCallback(errorMsg, message)
      });
  };
};


export const deleteCategory = (data, message) => {
  return dispatch => {
    request({
      method: 'post',
      url: AppConfig.API_URL + AppConfig.ENDPOINTS.MENU.DELETE_CATEGORY,
      data: data
    })
      .then(response => {
        if (response.data.data)
          dispatch(getMenuDetails(data.partnerId))
        deleteCallback('Category', message)
      })
      .catch(error => {
        let errorMsg = '';
        if (error && error.response && error.response.data && error.response.data.message) errorMsg = "Failed to update item";
        dispatch(menuError(errorMsg));
        errorCallback(errorMsg, message)
      });
  };
};

export const deleteItem = (data, message) => {
  return dispatch => {
    request({
      method: 'post',
      url: AppConfig.API_URL + AppConfig.ENDPOINTS.MENU.DELETE_ITEM,
      data: data
    })
      .then(response => {
        dispatch(getMenuDetails(data.partnerId))
        deleteCallback('Item', message)
      })
      .catch(error => {
        let errorMsg = '';
        if (error && error.response && error.response.data && error.response.data.message) errorMsg = "Failed to update item";
        dispatch(menuError(errorMsg));
        errorCallback(errorMsg, message)
      });
  };
};
