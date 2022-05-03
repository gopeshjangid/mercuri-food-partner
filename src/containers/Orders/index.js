import React from 'react'
import { Typography, Grid, CssBaseline, Divider } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import Sidebar from './orderUtils/Sidebar';
import TabSection from './orderUtils/Tabs';
import MainSection from './orderUtils/Main';
import { orders } from './orderUtils/data';

export const useStyles = makeStyles(theme => ({
  root: {
    minHeight: '100vh',
    overflowY: 'hidden'
  },
  sidebar: {
    backgroundColor: theme.palette.grey[300],
    width: theme.spacing(10.5)
  },
  divider: {
    width: theme.spacing(0.2),
    height: theme.dimensions.width100,
    color: theme.palette.common.black
  },
}))
export default function OrdersContainer(props) {

  const classes = useStyles();

  return (
    <>
      <CssBaseline />
      <Grid className={classes.root} wrap="nowrap" container>
        {/* <Grid item spacing={3}> */}
        <Sidebar classes={classes} />
        {/* </Grid> */}
        <Grid item container wrap="nowrap" xs={12}>
          <Grid item xs={3}>
            <TabSection />
          </Grid>
          <Divider classes={{
            root: classes.divider
          }} className={classes.divider} color="primary" />
          <Grid item xs={9}>
            <MainSection orders={orders} />
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}
