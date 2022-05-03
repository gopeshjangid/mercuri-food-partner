import React from 'react';
import TextField from '@material-ui/core/TextField';
import withStyles from '@material-ui/core/styles/withStyles';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  inputWrapper: {
    marginBottom: theme.spacing.unit
  },
  inputRoot: {
    padding: 0,
    'label + &': {
      marginTop: theme.spacing.unit * 3,
      marginBottom: theme.spacing.unit * 2,
    },
  },
  input: {
    borderRadius: theme.palette.radius.default,
    backgroundColor: theme.palette.common.white,
    border: `1px solid ${theme.palette.borderColor}`,
    fontSize: theme.palette.size.default,
    padding: theme.spacing(2),
    height: '1.1876em',
    '&:focus': {
      borderColor: theme.palette.primary.main,
    },
  },
  inputLabelRoot: {
    fontWeight: theme.typography.fontWeightBold,
    color: theme.palette.grey[800],
    fontFamily: 'Exo',
  },
  formLabelFocused: {},
  formHelperTextProps: {
    marginTop: theme.spacing(-1.5)
  }
}));


const MRCInputfield = ((props) => {

  const classes = useStyles()
  const { fields } = props

  return <TextField fullWidth color="primary"
    {...props}
    className={classes.inputWrapper}
    {...props.fields}
    InputProps={{
      disableUnderline: true,
      classes: {
        root: classes.inputRoot,
        input: clsx(classes.input, fields?.display)
      }, endAdornment: fields?.endAdornment,
    }}
    InputLabelProps={{
      shrink: true,
      classes: {
        root: classes.inputLabelRoot,
        focused: classes.formLabelFocused,
      },
      FormLabelClasses: {
        root: classes.inputLabelRoot,
        focused: classes.formLabelFocused,
      },
    }}
    FormHelperTextProps={{
      classes: {
        root: classes.formHelperTextProps
      }
    }}
  />
});

export default MRCInputfield;
