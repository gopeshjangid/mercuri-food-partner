import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';

import Login from '../Login/Login';
import Account from '../Account/Account';

import AppStorage from '../../utils/app.storage';
import { getPartnerDetails } from '../../components/BusinessProfile/businessUtils/apis/actions';


function App(props) {

  const token = AppStorage.getLoginToken();
  const router = useRouter();

  useEffect(() => {
    token && props.getPartnerDetails(JSON.parse(token)?.userId)

    if (token) {
      router.push('/account/business')
    } else {
      router.push('/login')
    }
  }, [token])

  return (
    token ? '' : <Login />
  );
}


export default connect(state => ({
  partner: state.partnerReducer.partner
}), { getPartnerDetails })(App);