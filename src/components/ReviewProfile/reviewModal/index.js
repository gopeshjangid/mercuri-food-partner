import React, { useContext, useState } from 'react';
import { Grid, Typography } from '@material-ui/core';

import DataDialog from '../../Universal/DataDailog';
import ENUMS from '../../../utils/enum';
import Axios from 'axios';
import AppStorage from '../../../utils/app.storage';
import { connect } from 'react-redux';
import { pick } from 'lodash';
import AppConfig from '../../../utils/config'
import { ToastMessageContext } from '../../../context/messageContext';

function ReviewProfileModal({
  title, action, data, handleClose, ...props
}) {

  const message = useContext(ToastMessageContext);
  const [loading, setLoading] = useState(false);
  const handleSubmit = () => {
    let possibleValues = ['address1', 'address2', 'city', 'email', 'firstName', 'lastName', 'partnerName',
      'phone', 'state', 'zipCode', 'website'];
    setLoading(true)
    let details = pick(props?.partner, possibleValues);
    try {
      if (possibleValues?.every(value => details?.hasOwnProperty(value)) && Object.values(details).every(value => value)) {
        let details = pick(props?.partner, ['address1', 'address2', 'city', 'email', 'firstName', 'lastName', 'partnerName',
          'phone', 'state', 'zipCode', 'website']);
        Axios.post(`${AppConfig.API_URL}/mercuri/api/partner/sendReview`, {
          ...details,
          phone: details.phone,
          "returnUrl": `${location?.origin}/account/business?business=profile`,
        }, {
          headers: {
            ['Authorization']: `Bearer ${JSON.parse(AppStorage.getLoginToken()).token}`,
            'Content-type': 'application/json'
          }
        }).then(res => {
          setLoading(false);
          let redirectUrl = res?.data?.data?.redirectUrl;
          window?.open(redirectUrl, '_self')
          return handleClose();

        }).catch(err => {
          setLoading(false);
          return handleClose();
        })
      } else {
        message.showToastMessage({ message: 'Complete your profile first', variant: 'warning' })
        setLoading(false);
        return handleClose();
      }
    } catch (error) {
      message.showToastMessage({ message: 'Complete your profile first', variant: 'warning' })
      setLoading(false);
      return handleClose();
    }
  };

  const textOk = ENUMS.BUSINESS.OKAY

  return (
    <>
      <DataDialog
        {...props}
        textOk={textOk}
        textCancel={ENUMS.CANCEL}
        actionMode={ENUMS.SINGLE}
        loading={loading}
        handleSubmit={handleSubmit}
      >
        <Grid container spacing={3} direction="column">
          <Grid item justify="center" container justify="space-between" alignItems="center">
            <Typography variant="h4">{title}</Typography>
          </Grid>
          <Grid item alignItems="center">
            <Typography>
              {ENUMS.BUSINESS.PROFILE_REVIEW}
            </Typography>
          </Grid>
        </Grid>
      </DataDialog>
    </>
  );
}


export default connect(state => ({
  partner: state.partnerReducer.partner
}))(ReviewProfileModal)