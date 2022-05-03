import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { CircularProgress } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  submit: {
    margin: theme.spacing(3, 0, 3),
    paddingTop: theme.spacing(1.2),
    paddingBottom: theme.spacing(1.2),
    fontSize: theme.palette.size.default,
    textTransform: 'none',
    display: 'flex',
    justifyContent: 'space-evenly',
    borderRadius: theme.palette.radius.default,
  },
  label: {
    fontWeight: theme.typography.fontWeightBold,
    fontFamily: 'Exo !important',
  },
  text: {
    color: theme.palette.common.white,
  },
  loader: {
    position: 'absolute'
  },
  lessOpaque: {
    opacity: 0.7
  }
}));

export default function MRCButton({ color, loading, labelText, ...props }) {
  const classes = useStyles();

  return (
    <Button
      type="submit"
      fullWidth
      disabled={loading}
      variant="contained"
      color={color || 'inherit'}
      {...props}
      className={clsx(classes.submit, props.className, props.width)}
      classes={{
        label: clsx(classes.label, labelText),
      }}
    >
      {loading && <CircularProgress className={classes.loader} color="primary" size={30} thickness={4.5} />}
      {props.children}
    </Button>
  );
}
