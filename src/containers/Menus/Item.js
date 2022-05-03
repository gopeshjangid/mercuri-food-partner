import React, { useContext } from 'react';
import { MenuItem, Grid, Typography, Box } from '@material-ui/core';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

import { MRCSwitch } from '../../components/Switch';
import FormcontrolPreventAction from '../../components/Universal/FormControl';
import { saveItem } from './ManageMenu/menuUtils/apis/actions';
import { ToastMessageContext } from '../../context/messageContext';


function Item({
  item, category, menu, classes, handleEditMenuItem, ...props
}) {

  const classes2 = useStyles();
  const message = useContext(ToastMessageContext);

  const activateItem = (e) => {
    props.saveItem({
      ...item,
      isActive: e.target.checked,
      partnerId: props.partnerId
    }, message)
  }

  return (
    <>
      <MenuItem
        className={classes.menuItem}
        onClick={() => handleEditMenuItem(item, category, menu)}
      >
        <Grid item className={item.isActive ? '' : classes2.disabled} xs={12} direction="row" container alignItems="center" justify="space-between">
          <Grid item xs={9} container alignItems="center" direction="row">
            <Box mx={1}>
              <FormcontrolPreventAction
                Component={<MRCSwitch
                  checked={item.isActive || false}
                  title={item.isActive ? "Deactivate Item" : "Activate Item"}
                  onChange={activateItem}
                />}
              />
            </Box>
            <Typography variant="body1" className={clsx(classes.heading)}>{item.name}</Typography>
          </Grid>

          <Grid item xs={2} container justify="flex-end">
            <Typography variant="subtitle2" className={classes.secondaryHeading}>
              $ {item.price}
            </Typography>
          </Grid>
        </Grid>
      </MenuItem>
    </>
  );
}


export default connect(state => ({
  partnerId: state.partnerReducer.partner.id
}), { saveItem })(Item)


const useStyles = makeStyles(theme => ({
  disabled: {
    opacity: 0.5,
  }
}))