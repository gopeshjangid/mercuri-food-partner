import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  submit: {
    margin: theme.spacing(3, 0, 2),
    fontWeight: theme.palette.weight.bold,
    fontSize: theme.palette.size.default,
    borderRadius: theme.palette.radius.default,
  },
  label: {
    fontWeight: theme.typography.fontWeightBold,
    fontFamily: 'Exo !important',
  },
}));

export default function Register(props) {
  const classes = useStyles();

  return (
    <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          {...props}
          classes={{
        label: (classes.label),
      }}
      >
      {props.text}
      </Button>
  );
}
