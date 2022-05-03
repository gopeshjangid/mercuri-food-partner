import React, { useState, useEffect } from 'react'
import { Select, FormControl, FormControlLabel, Typography, Grid, MenuItem, Chip } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { Controller, useFormContext } from 'react-hook-form';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(0)
  },
  input: {
    borderRadius: theme.spacing(1),
    backgroundColor: theme.palette.common.white,
    border: `1px solid ${theme.palette.transparent}`,
    fontSize: theme.palette.size.default,
    padding: theme.spacing(3.3, 0),
    width: theme.dimensions.width100,
    height: '1.5em',
    '&:focus': {
      borderColor: theme.palette.primary.main,
      borderRadius: theme.palette.radius.default
    },
  },
  selectFocus: {
    '&:focus': {
      backgroundColor: theme.palette.common.white,
      borderColor: theme.palette.primary.main,
      borderRadius: theme.palette.radius.default
    },
  },
  wrapper: {
    margin: theme.spacing(2, 0.5),
    '&:last-child': {
      marginBottom: theme.spacing(3)
    }
  },
  label: {
    fontSize: theme.spacing(1.5),
    lineHeight: 2.8,
    color: theme.palette.grey[800],
    fontWeight: theme.typography.fontWeightBold,
    fontFamily: 'Exo'
  },
  chip: {
    fontWeight: theme.typography.fontWeightBold,
    textTransform: 'uppercase !important'
  }
}))

export default function SelectInputChips({ options, labelName, taxes, handleChange = () => { }, ...props }) {

  const classes = useStyles();
  const [value, setValue] = useState("");
  const [selectOptions, setSelectOptions] = useState(taxes || options || props.fields.options);

  useEffect(() => {
    if (options?.length > 0) {
      return setSelectOptions(options)
    }
    setSelectOptions(props.fields.options)

  }, [options, props.fields.options]);

  return (
    <>
      <Grid container className={classes.wrapper}>
        <Grid item container>
          <Typography className={classes.label} variant="subtitle1">{props.fields.labelName}</Typography>
          <Controller
            defaultValue={options ? options[0] : selectOptions[0]}
            name={props.fields.name}
            as={<Select
              className={classes.input}
              classes={{
                select: classes.selectFocus
              }}
              inputRef={props?.props?.register}
              fullWidth variant="outlined"
              renderValue={(selected) => (
                <Chip color="primary" label={selected.name} className={classes.chip} />
              )}
            >
              {
                !!selectOptions?.length && selectOptions?.map(option => <MenuItem value={option}>{option.name}</MenuItem>)
              }

            </Select>}
            control={props?.props?.control}
          />

        </Grid>
      </Grid>
    </>
  )
}
