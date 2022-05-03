import React from 'react'
import { Grid, Typography, Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

import MRCOrdersTab from './tabUtils/tab'
import InnerTab from './OrderInnerTab';
import SelectedListItem from './tabUtils/verticalTab';
import { orders, closedOrders } from '../data';

const useStyles = makeStyles(theme => ({
  root: {
    fontFamily: 'Open Sans',
    textTransform: 'uppercase',
    padding: theme.spacing(1.4, 1.2),
    fontWeight: 600
  },
  count: {
    fontWeight: 800,
    fontSize: theme.spacing(2.2)
  },
  title: {
    fontWeight: 700,
    fontSize: theme.spacing(2)
  }
}))

export default function Orderoutertab(props) {

  const classes = useStyles();

  const headerData = {
    newOrders: {
      count: 3,
      title: 'New Orders'
    },
    closedOrders: {
      count: 1,
      title: 'Closed Orders'
    }
  }


  const tabHeaders = [
    {
      label: <Grid direction="column" className={classes.root} container>
        <Typography className={classes.count} variant="h6" color="initial">{orders.length}</Typography>
        <Typography className={classes.title} variant="button">{headerData.newOrders.title}</Typography>
      </Grid>
    },
    {
      label: <Grid direction="column" className={classes.root} container>
        <Typography className={classes.count} variant="h6">{closedOrders.length}</Typography>
        <Typography className={classes.title} variant="button">{headerData.closedOrders.title}</Typography>
      </Grid>
    }
  ]
  return (
    <>
      <MRCOrdersTab
        tabHeaders={tabHeaders}
        tabPanels={[<NewOrders orders={orders} />, <ClosedOrders closedOrders={closedOrders} />]}
      />
    </>
  )
}


const NewOrders = ({ orders }) => {
  return (
    <>
      {
        !orders?.length ? <Typography align="center">There is no orders yet</Typography> :
          <Grid>
            <SelectedListItem />
          </Grid>
      }
    </>
  )
}

const ClosedOrders = ({ closedOrders }) => {
  return (
    <>
      {
        !!closedOrders?.length ? <Box marginTop={3}><Typography align="center">There is no orders yet</Typography></Box> :
          <Grid>

          </Grid>
      }
    </>
  )
}