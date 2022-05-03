
const AppConfig = Object.freeze({
  API_URL: process.env.REACT_APP_API_ENDPOINT_URL,
  ENDPOINTS: {
    LOGIN_API_URL: '/mercuri/api/auth/login',
    REGISTER_API_URL: '/mercuri/api/auth/registerUser',
    PARTNER_API_URL: '/mercuri/api/partner/save',
    PARTNER_GET_API_URL: '/mercuri/api/partner',
    BRANDING_UPLOAD_URL: '/mercuri/api/partner/uploadFile',
    MENU: {
      GET_MENU: '/mercuri/api/menu',
      SAVE_MENU: '/mercuri/api/menu/saveMenu',
      SAVE_CATEGORY: '/mercuri/api/menu/saveCategory',
      SAVE_ITEM: '/mercuri/api/menu/saveItem',
      DELETE_MENU: '/mercuri/api/menu/deleteMenu',
      DELETE_CATEGORY: '/mercuri/api/menu/deleteCategory',
      DELETE_ITEM: '/mercuri/api/menu/deleteItem',
      SAVE_SIDE_MENU: '/mercuri/api/menu/saveSide',
      SAVE_SIDE_ITEM: '/mercuri/api/menu/saveSideItem',
      DELETE_SIDE: '/mercuri/api/menu/deleteSide',
      DELETE_SIDE_ITEM: '/mercuri/api/menu/deleteSideItem',
    },
    MASTER: {
      ORDER_TYPES: '/mercuri/api/master/orderTypes',
      POS_TYPES: '/mercuri/api/master/posTypes',
      PARTNER_TYPES: '/mercuri/api/master/partnerTypes'
    }
  }
});

export default AppConfig;