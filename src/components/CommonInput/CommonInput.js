import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import clsx from 'clsx';


const useStyles = makeStyles((theme) => ({
  inputWrapper: {
    marginBottom: theme.spacing.unit
  },
  matginTop16: {
    marginTop: theme.spacing(1.6)
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
  },
  moveTop: {
    marginTop: theme.spacing(-8)
  }
}));

export default function CommonInput(props) {
  const fieldsData = props.fields;
  const classes = useStyles();

  return (
    <>
      <TextField
        spellCheck={false}
        disabled={fieldsData.disabled}
        className={clsx(classes.inputWrapper, fieldsData.marginTop ? classes.matginTop16 : '', props?.css, fieldsData.moveTop ? classes.moveTop : '')}
        placeholder={fieldsData.placeholder}
        multiline={fieldsData?.multiline}
        rowsMax={fieldsData?.rows}
        fullWidth
        label={fieldsData.labelName}
        id={fieldsData.id}
        name={fieldsData.name}
        type={fieldsData.type}
        fullWidth
        inputRef={props?.props?.register ? props.props.register({
          required: fieldsData.required,
          maxLength: fieldsData.maxLength
        }) : null}
        error={!!props?.props?.errors ? !!props.props.errors[fieldsData.id] : null}
        helperText={!!props?.props?.errors ? !!props.props.errors[fieldsData.id] ? fieldsData?.maxLengthError ? fieldsData.maxLengthError : fieldsData.requiredErrorMessage : '' : ''}
        InputProps={{
          disableUnderline: true,
          classes: {
            root: classes.inputRoot,
            input: clsx(classes.input, fieldsData?.display, props?.textIndent)
          },
          endAdornment: props?.endAdornment,
          startAdornment: props?.startAdornment,
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
    </>
  );
}
