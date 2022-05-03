import React, { useContext, useEffect, useState } from 'react';
import { Box, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useStore, connect } from 'react-redux';
import * as _ from 'lodash';
import clsx from 'clsx';

import ENUMS from '../../utils/enum';
import BusinessHourRange from '../Universal/BusinessHours';
import { businesstemporarySuccess, getBusinessHourAction, markTemporaryClosed } from './businessUtils/businessHour/apis/actions';
import { getSchedule } from './businessUtils/businessHour/apis/reducer';
import { MRCSwitch } from '../Switch';
import { ToastMessageContext } from '../../context/messageContext';
import RestaurantType from './RestaurantType';


const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1, 0),
    padding: theme.spacing(0.5)
  },
  relative: {
    position: 'relative',
  },
  disabled: {
    opacity: 0.4
  },
  cover: {
    position: 'absolute',
    width: theme.dimensions.width100,
    height: theme.dimensions.width100,
    zIndex: 10000,
  }
}))


function Businesshours(props) {

  const classes = useStyles();
  const message = useContext(ToastMessageContext);
  const [data, setData] = React.useState([
    { active: false, name: "Monday", from: "08:00", to: "22:00" },
    { active: false, name: "Tuesday", from: "08:00", to: "22:00" },
    { active: false, name: "Wednesday", from: "08:00", to: "22:00" },
    { active: false, name: "Thursday", from: "08:00", to: "22:00" },
    { active: false, name: "Friday", from: "08:00", to: "22:00" },
    { active: false, name: "Saturday", from: "08:00", to: "22:00" },
    { active: false, name: "Sunday", from: "08:00", to: "22:00" }
  ]);
  const [days] = useState([
    { name: 'Mo', title: 'Monday' }, { name: 'Tu', title: 'Tuesday' }, { name: 'We', title: 'Wednesday' }
    , { name: 'Th', title: 'Thursday' }, { name: 'Fr', title: 'Friday' }, { name: 'Sa', title: 'Saturday' },
    { name: 'Su', title: 'Sunday' },
  ]);



  useEffect(() => {
    props.getBusinessHourAction(data)
  }, [data])

  useEffect(() => {
    props.getBusinessHourAction(_(data).keyBy('name').merge(_.keyBy(props.schedule, 'name')).values().value())
  }, [JSON.stringify(props.schedule)])

  const [isTemporaryClosed, setIsTemporaryClosed] = useState(false);

  useEffect(() => {
    setIsTemporaryClosed(props.partner.isTemporarilyClosed)
  }, [props.partner])

  const handleTemporaryClosed = e => {
    setIsTemporaryClosed(e.target.checked)
    props.businesstemporarySuccess(e.target.checked)
  }


  return (
    <>
      <Grid container className={classes.root}>
        <Grid container spacing={3}>
          <RestaurantType />
          <Grid xs={12} container item alignItems="center" direction="row">
            <MRCSwitch
              onChange={handleTemporaryClosed}
              checked={isTemporaryClosed} title={''} />
            <Box ml={2} width="80%"> <Typography>{'Set to Temporarily Closed'}</Typography></Box>
          </Grid>
          <Grid item>
            <Typography className={isTemporaryClosed ? classes.disabled : ''} variant="subtitle2">{ENUMS.BUSINESS.BUSINESS_HOURS}</Typography>
          </Grid>
          <Grid item xs={12} className={clsx(classes.relative, isTemporaryClosed ? classes.disabled : '')}>
            {
              isTemporaryClosed && <Grid item xs={12} className={isTemporaryClosed ? classes.cover : ''}></Grid>
            }
            {
              days.map(day => <BusinessHourRange disabled={isTemporaryClosed} key={day.title} {...props} setData={setData} title={day.title} />)
            }
          </Grid>
        </Grid>
      </Grid>

    </>
  )
}


export default connect((state) => ({
  schedule: state.scheduleReducer.schedule,
  isTemporarilyClosed: state.scheduleReducer.isTemporarilyClosed,
  partner: state.partnerReducer.partner
}), { getSchedule, getBusinessHourAction, businesstemporarySuccess: businesstemporarySuccess })(Businesshours)