import React from 'react'
import { Grid, Typography, Box, useTheme, Chip, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import ENUMS from '../../../../utils/enum';

import { useStyles as styles } from '../../index';
import OrderMain from '../../../../../public/static/images/orders/order_main.png';
import MRCButton from '../../../../components/Button/MRCButton';
import { Print, Help, HelpOutline } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  ...styles,
  iconButtonFlat: {
    backgroundColor: theme.palette.grey[200],
    borderRadius: theme.spacing(1)
  },
  detailHeader: {
    boxShadow: `${theme.spacing(0.3, 0.5, 1)} ${theme.palette.borderColor}`,
    minHeight: theme.spacing(20.5),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  typoCaption: {
    fontWeight: theme.typography.fontWeightBold,
    color: theme.palette.grey[600],
    fontSize: theme.spacing(2.1),
  },
  ligthGrey: {
    fontWeight: theme.typography.fontWeightMedium,
    color: theme.palette.grey[500],
    fontSize: theme.spacing(1.9)
  },
  itemDetails: {
    overflowY: 'scroll',
    maxHeight: `77vh`,
    '&::-webkit-scrollbar': {
      width: theme.spacing(0.8),
    },
    '&::-webkit-scrollbar-track': {
      '-webkit-box-shadow': `inset 0 0 ${theme.spacing(0.8)}px ${theme.palette.grey[500]}`
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: theme.palette.primary.main,
      borderRadius: theme.spacing(2),
    }
  },
  itemTitle: { textTransform: 'uppercase' },
  itemVarietyWrapper: {
    borderLeft: `${theme.spacing(0.4)}px solid ${theme.palette.grey[400]}`,
    marginBottom: theme.spacing(7),
    marginTop: theme.spacing(2.5)
  }, varietyLabel: {
    textTransform: 'uppercase',
    fontSize: theme.spacing(1.9),
    fontWeight: theme.typography.fontWeightRegular
  }, varietyLabelText: {
    fontWeight: theme.typography.fontWeightBold
  }
}))

export default function MainSection({ orders, ...props }) {

  const classes = useStyles();

  return (
    <>
      <Box bgcolor={useTheme().palette.common.white} height="100vh" width="100%">
        {
          !orders?.length ? <Grid className={classes.root} item justify="center" alignItems="center" direction="column" container spacing="3">
            <Grid item>
              <img src={OrderMain} alt="OrderHero" />
            </Grid>
            <Grid item>
              <Typography variant="h6">
                {
                  ENUMS.ORDERS.UPTO_DATE_TEXT
                }
              </Typography>
            </Grid>
          </Grid> :
            <>
              <Grid className={classes.detailHeader} item container direction="column">
                <Grid item container justify="space-between">
                  <Grid item container xs={6} alignItems="center">
                    <Box paddingLeft={5} width="100%">
                      <Grid item container justify="space-between" alignItems="center" xs={12}>
                        <Typography variant="h4">Order {orders[0].orderNo}</Typography>
                        <Grid item xs={2}><Chip label={`Table #${orders[0].tableNo}`} variant="outlined" color="primary" /></Grid>
                        <Grid item xs={2}>
                          <IconButton><HelpOutline fontSize="default" /></IconButton>
                        </Grid>
                      </Grid>
                    </Box>
                  </Grid>
                  <Grid item container xs={4} alignItems="center" justify="space-evenly">
                    <Grid item xs={2}>
                      <IconButton className={classes.iconButtonFlat}><Print fontSize="large" /></IconButton>
                    </Grid>
                    <Grid item xs={5}>
                      <MRCButton color="primary">Close Order</MRCButton>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item direction="column" justify="center" container>
                  <Box paddingLeft={5}><Typography className={classes.typoCaption} variant="body1" >{orders[0].items.length} items</Typography>
                    <Typography variant="body1"><span className={classes.typoCaption}>Ordered: </span> <span className={classes.ligthGrey}>at {moment(orders[0].orderAt).format('hh:mm A')}</span></Typography>
                  </Box>
                </Grid>
              </Grid>
              <Grid item container>

                <Box p={4} marginRight={3} className={classes.itemDetails} width="100%">
                  {
                    orders[0].items.map((item, index) => <>
                      <Grid key={index} item>
                        <Typography className={classes.itemTitle} variant="h6" color="primary">{item.name}</Typography>
                      </Grid>
                      <Grid className={classes.itemVarietyWrapper} item container direction="column">
                        <Box m={1}>
                          <Typography className={classes.varietyLabel}>Variation:</Typography>
                          <Typography variant="button" className={classes.varietyLabelText}>{item.variation}</Typography>
                        </Box>
                        <Box m={1}>
                          <Typography className={classes.varietyLabel}>Sides:</Typography>
                          <Typography variant="button" className={classes.varietyLabelText}>{item.sides || '-'}</Typography>
                        </Box>
                        <Box m={1}>
                          <Typography className={classes.varietyLabel}>Special instructions:</Typography>
                          <Typography variant="button" className={classes.varietyLabelText}>{item.specialInstructions}</Typography>
                        </Box>
                      </Grid>
                    </>
                    )
                  }
                </Box>
              </Grid>
            </>
        }
      </Box>

    </>
  )
}
