import axios from "axios";
import AppConfig from "./config";
import AppStorage from './app.storage';

export const request = function (options) {

  const authHeaders = AppStorage.getItem('authorization_headers') ? JSON.parse(AppStorage.getItem('authorization_headers')) : '';
  const client = axios.create({
    baseURL: AppConfig.API_URL,
    headers: authHeaders
  });

  const onSuccess = function (response) {
    if (options.handleHeaders === 1) {
      if (response && response.data && response.data.data.token) {
        AppStorage.setItem('authorization_headers', `${JSON.stringify({
          'Authorization': 'Bearer ' + response.data.data.token
        })}`);
        AppStorage.setLoginToken(response.data.data);
      }
    }

    if (options.handleHeaders === 0) {
      const token = AppStorage.getLoginToken('login_token');
      AppStorage.clearLoginToken();
      window.location.href = '/login';
    }
    else {
      return { ...response, success: true }
    }
  };

  const onError = function (error) {
    if (options.handleHeaders === 0) {
      const token = AppStorage.getLoginToken('login_token');
      AppStorage.clearLoginToken();
    }
    if (error.response) {
      if (error.response.status === 401 && options.handleHeaders !== 1) {
        window.location.href = '/login';
      }
    }
    //Check API and return response in accepted state with error data and success equals false flag to avoid catch block in all api requests.
    return Promise.reject(error.response ? error.response.data : { message: "something went wrong", success: false } || error.message || error.errors);
  };

  return client(options)
    .then(onSuccess)
    .catch(onError);
};

export default request;


