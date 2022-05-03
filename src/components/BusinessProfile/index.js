import React, { useEffect, useState, useContext } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Link, CircularProgress, Box, Grid, Typography } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { useStore, connect } from 'react-redux';

import Title from '../../components/Title/Title';
import InputFields from '../../components/CommonInput/InputFields';
import inputFieldData from '../Business/inputFields.json';
import ReviewProfile from '../../components/ReviewProfile/ReviewProfile';
import Button from '../../components/Button/Button';
import ENUMS from '../../utils/enum';
import AppStorage from '../../utils/app.storage';

import { getPartnerAction, getPartnerDetails } from './businessUtils/apis/actions';
import { getBusinessHourAction } from './businessUtils/businessHour/apis/actions';
import { getOrderTypeAction } from './businessUtils/orderType/apis/actions';
import { ToastMessageContext } from '../../context/messageContext';
import Logout from '../../../public/static/images/Logout.jpg';
import MRCButton from '../Button/MRCButton';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 'auto',
    display: 'block',
    justifyContent: 'center',
    minHeight: '50vh'
  },
  form: {
    width: theme.dimensions.width100, // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  title: {
    textTransform: 'capitalize',
  }
}));

function BusinessProfile(props) {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, errors, control, formState, setValue } = useForm({
    mode: "all"
  });
  const message = useContext(ToastMessageContext);



  const onSubmit = (data) => {
    setLoading(true)

    if (props.partner.partner) {
      return props.getPartnerAction({
        ...data, schedule: props.schedule, ...props.branding,
        userId: props?.partner?.user_id,
        id: props?.partner?.partner?.id,
        orderType: props?.orderType?.filter(ot => ot.id) || [],
        partnerType: props?.partnerType[0],
        isTemporarilyClosed: props.isTemporarilyClosed
      }, message)
    }
    return props.getPartnerAction({
      ...data, schedule: props.schedule, ...props.branding,
      userId: props?.partner?.id,
      orderType: props?.orderType?.filter(ot => ot.id) || [],
      partnerType: props?.partnerType[0]
    }, message)

  };




  useEffect(() => {
    if (!props?.partner?.id) {
      let token = AppStorage.getLoginToken();
      token && (props.getPartnerDetails(JSON.parse(token).userId, message))
    }

  }, [])


  useEffect(() => {

    const { email, firstName, lastName, partnerName
    } = props.partner;



    if (props.partner) {
      setValue("email", email)
      setValue("firstName", firstName)
      setValue("lastName", lastName)
      setValue("partnerName", partnerName)
    }

    if (props?.partner?.partner) {
      const { partnerName, salesTax, alcoholTax, state, phone, city
        , partnerOrderTypes, description, posSystemTypes, partnerTypes, schedules, website, zipCode, address1, address2, } = props?.partner?.partner;

      if (props.partner) {
        setValue("email", email)
        setValue("firstName", firstName)
        setValue("description", description)
        setValue("lastName", lastName)
        setValue("partnerName", partnerName)
        setValue("salesTax", salesTax);
        setValue("alcoholTax", alcoholTax);
        setValue("state", state);
        setValue("city", city);
        setValue("phone", phone);
        setValue("address1", address1);
        setValue("address2", address2);
        setValue("website", website);
        setValue("zipCode", zipCode);
        setValue("partnerOrderTypes", partnerOrderTypes);
        setValue("posSystemTypes", posSystemTypes);
        setValue("partnerTypes", partnerTypes);
        setValue("schedules", schedules)
      }
    }
    setLoading(false);
  }, [props.partner])



  useEffect(() => {
    if (props?.partner?.partner) {
      props.getBusinessHourAction(props?.partner?.partner?.schedules?.schedule)
      props.getOrderTypeAction(props?.partner?.partnerOrderType?.map(type => parseInt(type?.type?.value)))
    }
  }, [JSON.stringify(props?.partner?.partner?.id)])


  return (
    <div className={classes.root}>
      <CssBaseline />
      {
        props?.partner?.id ? <Grid>
          <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
            <ReviewProfile />
            <Box bgcolor={useTheme().palette.common.white} padding={4} borderRadius={8}>
              <Typography className={classes.title} variant="h4">{ENUMS.BUSINESS_PROFILE}</Typography>
              <p>{ENUMS.TELL_YOUR_CUSTOMER}</p>
              <Grid item xs={12} md={12} lg={9}>
                <InputFields {...props.partner} control={control} register={register} errors={errors} FieldsData={inputFieldData} />
              </Grid>
              <Grid item md={2}>
                <MRCButton loading={loading} type="submit" color="primary">
                  {ENUMS.SAVE}
                </MRCButton>
              </Grid>
            </Box>
          </form>
        </Grid> : ''
      }
    </div>
  );
}

export default connect(state => ({
  schedule: state.scheduleReducer.schedule,
  isTemporarilyClosed: state.scheduleReducer.isTemporarilyClosed,
  orderType: state.orderTypeReducer.orderType,
  branding: state.brandingReducer.branding,
  partner: state.partnerReducer.partner,
  partnerType: state.restaurantTypeReducer.restaurantType,
}), { getPartnerAction, getPartnerDetails, getBusinessHourAction, getOrderTypeAction })(BusinessProfile)