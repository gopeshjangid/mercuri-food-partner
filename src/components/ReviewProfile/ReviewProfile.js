import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import { Warning } from '@material-ui/icons';

import ENUMS from '../../utils/enum';
import ReviewProfileModal from './reviewModal';
import MRCButton from '../Button/MRCButton';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.grey.A700,
    display: theme.typography.display.flex,
    justifyContent: 'space-between',
    color: theme.palette.common.white,
    borderRadius: theme.palette.radius.default,
    padding: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2
  },
  content: {
    display: theme.typography.display.flex,
  }
  ,
  warningWrapper: {
    display: 'flex',
    alignItems: 'baseline',
    fontFamily: 'Exo',
    fontWeight: theme.typography.fontWeightBold
  },
  warning: {
    marginRight: theme.spacing(1),
    color: theme.palette.warning.light,
    alignSelf: 'end'
  }
}));

export default function ReviewProfile() {
  const classes = useStyles();
  const [review, setReview] = useState(false);

  const handleClose = () => {
    setReview(false);
  }

  const handleOpenReview = () => {
    setReview(true);
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Grid container className={classes.content} alignItems="center" justify="space-between" spacing={1}>
        <Grid item md={8}>
          <Grid className={classes.warningWrapper}><Warning fontSize="small" className={classes.warning} />{ENUMS.ACTIVATE_ACCOUNT_LONG}</Grid>
        </Grid>
        <Grid md={3}>
          <MRCButton
            variant="contained" color="primary"
            text="primary"
            type="button"
            onClick={handleOpenReview}
          >
            {ENUMS.SEND_YOUR_PROFILE}
          </MRCButton>
        </Grid>
      </Grid>
      {
        review && <ReviewProfileModal handleClose={handleClose} title={ENUMS.PROFILE_SENT_FOR_REVIEW} />
      }
    </div>
  );
}