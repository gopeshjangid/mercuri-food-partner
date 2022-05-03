import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

import MRCTab from '../../../components/Universal/Tab'
import ENUMS from '../../../utils/enum';

import Simplified from '../../../../public/static/images/branding/simplified.png';
import Restaurant from '../../../../public/static/images/branding/restaurant.png';



const useStyles = makeStyles(theme => ({
  deviceWrapper: {
    position: 'relative',
  },
  deviceFrame: {
    position: 'absolute',
    zIndex: 100
  },
  deviceImage: {
    position: 'absolute',
    top: theme.spacing(0.8),
  },
}))

export default function BrandindPreview(props) {

  const classes = useStyles();

  return (
    <>
      <MRCTab
        tabHeaders={[{ label: ENUMS.RESTAURANT_VIEW }, { label: ENUMS.SIMPLIFIED_VIEW }]}
        tabPanels={[
          <Grid item container justify="center" className={classes.deviceWrapper}>
            <img className={classes.deviceFrame} src={Restaurant} />
          </Grid>
          ,
          <Grid item container justify="center" className={classes.deviceWrapper}>
            <img className={classes.deviceFrame} src={Simplified} />
          </Grid>
        ]}
        helperText={ENUMS.PREVIEW_HELPER_TEXT}
      />
    </>
  )
}
