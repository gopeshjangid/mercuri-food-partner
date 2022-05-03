import React from 'react'
import { AppBar, Toolbar, IconButton, Typography, Grid } from '@material-ui/core'
import { DeleteOutline, KeyboardBackspace as BackIcon } from '@material-ui/icons'

import FullScreenRightDrawer from '../../../../components/Universal/FullWidthDrawer'
import { useStyles } from '../../ManageItem'
import ENUMS from '../../../../utils/enum'
import SideMenu from './sideMenuUtils'

export default function ManageSideMenu(props) {

  const classes = useStyles();

  const submit = () => {
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
              {ENUMS.BACK_TO_SIDE_ITEM_MENU}
            </Typography>
          </Toolbar>
        </AppBar>
        <Grid className={classes.container} container direction="column">
          <SideMenu {...props} />
        </Grid>
      </FullScreenRightDrawer>
    </>
  )
}
