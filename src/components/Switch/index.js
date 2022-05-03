import React from 'react';
import Switch from '@material-ui/core/Switch';
import { withStyles } from '@material-ui/core/styles';

export const MRCSwitch = withStyles((theme) => ({
  root: {
    width: theme.spacing(5.8),
    height: theme.spacing(3.3),
    padding: 0,
    margin: theme.spacing(1),
  },
  switchBase: {
    padding: 3,
    '&$checked': {
      transform: `translateX(${theme.spacing(2)})`,
      color: theme.palette.common.white,
      '& + $track': {
        backgroundColor: theme.palette.primary.main,
        opacity: 1,
        border: 'none',
      },
    },
    '&$focusVisible $thumb': {
      color: theme.palette.primary.main,
      border: `${theme.spacing(0.75)} solid ${theme.palette.common.white}`,
    },
  },
  thumb: {
    width: theme.spacing(2.5),
    height: theme.spacing(2.5),
  },
  track: {
    borderRadius: theme.spacing(2),
    border: `1px solid ${theme.palette.grey[400]}`,
    backgroundColor: theme.palette.grey[300],
    opacity: 1,
    transition: theme.transitions.create(['background-color', 'border']),
  },
  checked: {},
  focusVisible: {},
}))(({ classes, ...props }) => (
  <Switch
    focusVisibleClassName={classes.focusVisible}
    disableRipple
    checked={props?.checked}
    classes={{
      root: classes.root,
      switchBase: classes.switchBase,
      thumb: classes.thumb,
      track: classes.track,
      checked: classes.checked,
    }}
    {...props}
  />
));
