import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputColor from 'react-input-color';
import { sha256 } from 'js-sha256';
import { connect } from 'react-redux';


const useStyles = makeStyles((theme) => ({
  inputRoot: {
    padding: 0,
    'label + &': {
      marginTop: theme.spacing.unit * 3,
      marginBottom: theme.spacing.unit * 2
    }
  },
  input: {
    textIndent: theme.spacing(4),
    borderRadius: theme.palette.radius.default,
    backgroundColor: theme.palette.common.white,
    border: `1px solid ${theme.palette.borderColor}`,
    fontSize: theme.palette.size.default,
    padding: theme.spacing(2),
    height: '1.1876em',
    '&:focus': {
      borderColor: theme.palette.primary.main
    }
  },
  inputLabelRoot: {
    fontWeight: theme.typography.fontWeightBold,
    color: theme.palette.grey[800],
    fontFamily: 'Exo',
  },
  formLabelFocused: {}
}));
const defaultColor = '#000000';
function ColorPickerInput({ placeholder, label, startAdornment = null, requiredErrorMessage, ...props }) {

  const classes = useStyles();
  const [color, setColor] = useState(props?.props?.watchFileField?.brandColor);

  const onChange = (color) => {
    setColor(color?.target?.value || color?.hex)
  }

  const inputChange = ({ target }) => {
    if (color?.length === 'undefined') {
      return setColor(props.brandColor)
    }
    if (color === undefined || color?.length < 1) {
      return setColor(props?.props?.watchFileField?.brandColor)
    }

    setColor(target?.value || color)
  }

  useEffect(() => {
    props?.props?.setBrandingColor(color)
    if (props.props) {
      props?.props?.setValue("brandColor", color)
    }
  }, [color])


  return (
    <React.Fragment>
      <TextField
        placeholder={placeholder}
        label={label}
        fullWidth
        color={color}
        InputProps={{
          disableUnderline: true,
          classes: {
            root: classes.inputRoot,
            input: classes.input
          },
          startAdornment: <InputColor
            initialValue={color ? color : defaultColor}
            onChange={onChange}
            placement="right"
            {...props.fields}
            inputRef={props?.props?.register ? props.props.register({ required: props.fields.required }) : null}
          />
        }}
        InputLabelProps={{
          shrink: true,
          FormLabelClasses: {
            root: classes.inputLabelRoot,
            focused: classes.formLabelFocused
          }
        }}
        value={color}
        onChange={inputChange}
        onKeyUp={inputChange}
        requiredErrorMessage={requiredErrorMessage || ''}
      />
    </React.Fragment>
  );
}


export default connect(state => ({
  brandColor: state.brandingReducer?.branding?.brandColor
}), {})(ColorPickerInput)