import React, { useContext } from 'react';
import { Grid, Typography, IconButton, Toolbar, AppBar, Box } from '@material-ui/core';
import { DeleteOutline, KeyboardBackspace as BackIcon } from '@material-ui/icons';
import makeStyles from "@material-ui/core/styles/makeStyles";

import ENUMS from '../../../utils/enum';
import FullScreenRightDrawer from '../../../components/Universal/FullWidthDrawer';
import ItemsTabs from './itemUtils/itemTabs';


export const useStyles = makeStyles(theme => ({
  appBar: {
    backgroundColor: "transparent",
    color: theme.palette.common.black,
    boxShadow: 'none',
  },
  container: {
    padding: theme.spacing(4, 9, 4, 4),
    overflowY: 'scroll'
  },
  backButton: {
    marginRight: theme.spacing(2),
  },
  wrapper: {
    margin: theme.dimensions.width3
  },
  title: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(3.2)
  }
}));

export function ManageItem({
  title, ...props
}) {
  const classes = useStyles();

  const submit = (_data) => {
    props?.handleClose();
  };


  return (
    <>
      <FullScreenRightDrawer open={props.open}>
        <AppBar position="static" className={classes.appBar} elevation={0}>
          <Toolbar>
            <IconButton onClick={submit} edge="start" className={classes.backButton} color="inherit"
              aria-label="back">
              <BackIcon />
            </IconButton>
            <Typography variant="subtitle2">
              {ENUMS.BACK_TO_MENU}
            </Typography>
          </Toolbar>
        </AppBar>
        <Grid className={classes.container} container direction="column">
          <ItemsTabs {...props} title={title} />
        </Grid>
      </FullScreenRightDrawer>
    </>
  );
}
