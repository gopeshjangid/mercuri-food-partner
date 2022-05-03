import Cookies from 'js-cookie';

function AppStorage() {

  this.setLoginToken = (token) => {
    Cookies.set('login_token', token);
  };

  this.getLoginToken = () => {
    const logintoken = Cookies.get('login_token');
    if (!logintoken) {
      return '';
    }
    else {
      try {
        const token = Cookies.get('login_token');
        return token;
      } catch (err) {
        return '';
      }
    }
  };

  this.clearLoginToken = () => {
    Cookies.remove('login_token');
    Cookies.remove('authorization_headers')
  }

  this.setItem = (name, value) => {
    Cookies.set(name, value)
  }

  this.getItem = (name) => {
    return Cookies.get(name)
  }

}

module.exports = new AppStorage();