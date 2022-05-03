import React, { useContext, useEffect } from 'react';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import clsx from 'clsx';
import { Checkbox } from '@material-ui/core';
import { useDispatch, useStore, connect } from 'react-redux';

import ENUMS from '../../utils/enum';
import ToggleButton from '../Button/MRCToggleButton';
import { getOrderTypeAction, getMasterOrderTypes } from './businessUtils/orderType/apis/actions';
import { ToastMessageContext } from '../../context/messageContext';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1.5, 0),
    padding: theme.spacing(0.5)
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    fontSize: theme.palette.size.default,
    textTransform: 'none',
    color: theme.palette.common.black,
    borderRadius: `${theme.palette.radius.default} !important`,
    border: `1px solid ${theme.palette.grey[400]} !important`,
  },
  orderButton: {
    padding: theme.spacing(2.5, 1.6) + ' !important',
    textAlign: 'left',
    border: `1px solid ${theme.palette.grey[400]}`,
    '&active': {
      border: `1px solid ${theme.palette.primary.main}`,
      backgroundColor: `${theme.palette.button.lightPrimary}`
    },
    [theme.breakpoints.down("md")]: {
      padding: theme.spacing(2, 1.2) + ' !important',

    }
  },
  active: {
    border: `1px solid ${theme.palette.primary.main} !important`,
    color: `${theme.palette.primary.main} !important`,
    backgroundColor: `${theme.palette.button.lightPrimary} !important`
  },
  inactive: {
    border: `1px solid ${theme.palette.grey[400]}`,
    color: theme.palette.common.black,
  },
  toggleButtonGroup: {
    width: '80%',
    marginLeft: theme.spacing(1.5),
    justifyContent: 'space-around'
  },
  checkBox: {
    alignSelf: 'normal',
    position: 'absolute',
    top: theme.spacing(0), right: theme.spacing(0)
  },
  textSecondary: {
    width: `${theme.dimensions.width80}`
  }
}));


function Ordertype(props) {

  const classes = useStyles();
  const [formats, setFormats] = React.useState([]);
  const [orderTypes, setOrderTypes] = React.useState([]);
  const groups = ['Dine', 'Takeout'];
  const message = useContext(ToastMessageContext);
  const handleFormat = newFormats => (event) => {
    if (formats?.some(e => e.id === newFormats.id))
      return setFormats(formats?.filter(format => format.id !== newFormats.id))
    !!formats?.length && setFormats([...formats, newFormats]);
    !formats?.length && setFormats([newFormats])
  };


  useEffect(() => {
    (async () => {
      setOrderTypes(await getMasterOrderTypes(message))
    })()
  }, [])

  useEffect(() => {
    const ot = props?.partner?.partnerOrderType?.map(ptot => ({
      ...ptot, ...ptot.type
    }))
    setFormats(ot)
  }, [orderTypes, props?.partner]);

  useEffect(() => {
    props.getOrderTypeAction(formats)
  }, [formats]);

  useEffect(() => {
    setFormats(props?.orderType?.filter(ot => ot.id))
    props.getOrderTypeAction(_.unionBy(props.orderType, formats))
  }, [JSON.stringify(props.orderType)])

  const active = type => formats?.some(e => e.id === type.id);

  return (
    <>
      <Grid container className={classes.root}>
        <Grid container spacing={3}>
          <Grid item>
            <Typography variant="subtitle2">{ENUMS.ORDER_TYPE.DINE_LONG_TEXT}</Typography>
          </Grid>
          <Grid item xs={9} container justify="space-between" >

            <ToggleButton value={{ id: 1, group: groups[0] }} aria-label="table" className={clsx(classes.orderButton, classes.submit, formats?.includes({ id: 1, group: groups[0] }) ? classes.active : classes.inactive)} variant="outlined">
              <Grid item  >
                <Typography color={active({ id: 1, group: groups[0] }) ? 'primary' : 'default'} variant="h6">{ENUMS.ORDER_TYPE.TABLE_SERVICE}</Typography>
                <Typography className={classes.textSecondary} color={active({ id: 1, group: groups[0] }) ? 'primary' : 'textSecondary'} variant="body2">{ENUMS.BUSINESS.TABLE_LONG_TEXT}</Typography>
              </Grid>
              <Checkbox color="primary" checked={active({ id: 1, group: groups[0] })} name={"table"} onChange={handleFormat({ id: 1, group: groups[0] })} className={classes.checkBox} />
            </ToggleButton>


            <ToggleButton value={{ id: 2, group: groups[0] }} aria-label="pickup" className={clsx(classes.orderButton, classes.submit, formats?.includes({ id: 2, group: groups[0] }) ? classes.active : classes.inactive)} variant="outlined">
              <Grid item >
                <Typography color={active({ id: 2, group: groups[0] }) ? 'primary' : 'default'} variant="h6">{ENUMS.BUSINESS.PICK_UP_COUNTER}</Typography>
                <Typography className={classes.textSecondary} color={active({ id: 2, group: groups[0] }) ? 'primary' : 'textSecondary'} variant="body2">{ENUMS.BUSINESS.PICK_UP_COUNTER_LONG_TEXT}</Typography>
              </Grid>
              <Checkbox color="primary" name={"pickup"} checked={active({ id: 2, group: groups[0] })} onChange={handleFormat({ id: 2, group: groups[0] })} className={classes.checkBox} />
            </ToggleButton>
          </Grid>
          <Grid item>
            <Typography variant="subtitle2">{ENUMS.BUSINESS.ORDER_TYPE_LONG_TEXT}</Typography>
          </Grid>
          <Grid item xs={9} container justify="space-between" >
            <ToggleButton value={{ id: 3, group: groups[1] }} aria-label="takeout" className={clsx(classes.orderButton, classes.submit, formats?.includes({ id: 3, group: groups[1] }) ? classes.active : classes.inactive)} variant="outlined">
              <Grid item >
                <Typography color={active({ id: 3, group: groups[1] }) ? 'primary' : 'default'} variant="h6">{ENUMS.ORDER_TYPE.PICK_UP_INSIDE}</Typography>
                <Typography className={classes.textSecondary} color={active({ id: 3, group: groups[1] }) ? 'primary' : 'textSecondary'} variant="body2">{ENUMS.ORDER_TYPE.PICK_UP_INSIDE_LONG_TEXT}</Typography>
              </Grid>
              <Checkbox color="primary" name={"takeout"} checked={active({ id: 3, group: groups[1] })} onChange={handleFormat({ id: 3, group: groups[1] })} className={classes.checkBox} />
            </ToggleButton>
            <ToggleButton value={{ id: 4, group: groups[1] }} aria-label="takeout" className={clsx(classes.orderButton, classes.submit, formats?.includes({ id: 4, group: groups[1] }) ? classes.active : classes.inactive)} variant="outlined">
              <Grid item >
                <Typography color={active({ id: 4, group: groups[1] }) ? 'primary' : 'default'} variant="h6">{ENUMS.ORDER_TYPE.CURBSIDE_PICKUP}</Typography>
                <Typography className={classes.textSecondary} color={active({ id: 4, group: groups[1] }) ? 'primary' : 'textSecondary'} variant="body2">{ENUMS.ORDER_TYPE.CURBSIDE_LONG_TEXT}</Typography>
              </Grid>
              <Checkbox color="primary" name={"takeout"} checked={active({ id: 4, group: groups[1] })} onChange={handleFormat({ id: 4, group: groups[1] })} className={classes.checkBox} />
            </ToggleButton>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export default connect(state => ({
  orderType: state.orderTypeReducer.orderType,
  partner: state.partnerReducer.partner
}), { getOrderTypeAction, getMasterOrderTypes })(Ordertype)