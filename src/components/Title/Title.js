import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  title: {
    margin: 0,
    padding: 0,
    textAlign: 'left',
    fontSize: theme.palette.size.default * 2,
    fontFamily: 'Exo',
    fontWeight: theme.typography.fontWeightBold
  }
}));

export default function Title(props) {
  const classes = useStyles();

  return (
    <h1 className={classes.title}>{props.title}</h1>
  );
}
