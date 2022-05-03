import { combineReducers } from 'redux';

import userLoginReducer from '../containers/Login/loginUtils/apis/reducer';
import userRegisterReducer from '../containers/Register/registerUtils/apis/reducer';
import brandingReducer from '../containers/Branding/brandingUtils/apis/reducer';
import scheduleReducer from '../components/BusinessProfile/businessUtils/businessHour/apis/reducer';
import orderTypeReducer from '../components/BusinessProfile/businessUtils/orderType/apis/reducer';
import partnerReducer from '../components/BusinessProfile/businessUtils/apis/reducer';
import menuReducer from '../containers/Menus/ManageMenu/menuUtils/apis/reducer';
import sideMenuReducer from '../containers/Menus/SideMenu/sideMenuUtils/apis/reducer';
import restaurantTypeReducer from '../components/BusinessProfile/businessUtils/restaurantType/apis/reducer';

const appReducer = combineReducers({
  userLoginReducer,
  userRegisterReducer,
  partnerReducer,
  brandingReducer,
  scheduleReducer,
  orderTypeReducer,
  menuReducer,
  sideMenuReducer,
  restaurantTypeReducer
});

const rootReducer = (state, action) => {
  if (action.type === 'LOGIN_RESET_STATE') {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;