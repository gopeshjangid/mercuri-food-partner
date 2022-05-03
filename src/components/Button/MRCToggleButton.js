import React from 'react';
import ToggleButton from '@material-ui/lab/ToggleButton';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: `275px !important`,
    [theme.breakpoints.down("md")]: {
      maxWidth: '235px !important'
    }
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    fontSize: theme.palette.size.default,
    textTransform: 'none',
    borderRadius: theme.palette.radius.default,
  },
  label: {
    fontWeight: theme.typography.fontWeightBold,
    fontFamily: 'Exo !important',
  },
  text: {
    color: theme.palette.common.white,
  },
  active: {
    border: `1px solid ${theme.palette.primary.main} !important`,
    color: `${theme.palette.primary.main} !important`,
    backgroundColor: `${theme.palette.button.lightPrimary} !important`
  },
  inactive: {
    border: `1px solid ${theme.palette.grey[400]}`,
    color: theme.palette.common.black,
  }
}));



export default function MRCButton({ color, labelText, active, ...props }) {

  const classes = useStyles();

  return (
    <ToggleButton classes={{
      root: classes.root,
      selected: classes.active,
    }} value="table" aria-label="table" {...props} variant="outlined">
      {props.children}
    </ToggleButton>
  );
}
