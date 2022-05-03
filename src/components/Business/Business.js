import React from 'react';
import { Grid, CssBaseline } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import BusinessTabs from '../BusinessTabs/BusinessTabs';

const useStyles = makeStyles((theme) => ({
  root: {
    display: theme.typography?.display?.block,
    '& h1': {
      textTransform: 'capitalize'
    }
  }
}));

export default function Business() {
  const classes = useStyles();

  return (

    <Grid container justify="center">
      <BusinessTabs />
    </Grid>

  );
}