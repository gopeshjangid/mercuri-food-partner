import React, { useState } from 'react'
import { Select, FormControl, FormControlLabel, Typography, Grid, MenuItem } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { Controller } from 'react-hook-form';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(1, 0)
  },
  input: {
    borderRadius: theme.spacing(1),
    backgroundColor: theme.palette.common.white,
    border: `1px solid ${theme.palette.transparent}`,
    fontSize: theme.palette.size.default,
    padding: theme.spacing(3.35, 0),
    width: theme.dimensions.width100,
    height: '1.5em',
    '&:focus': {
      borderColor: theme.palette.primary.main,
      borderRadius: theme.palette.radius.default
    },
  }, wrapper: {
    margin: theme.spacing(2, 0.5)
  },
  label: {
    fontSize: theme.spacing(1.5),
    lineHeight: 2.8,
    color: theme.palette.grey[800],
    fontWeight: theme.typography.fontWeightBold,
    fontFamily: 'Exo'
  },
  width50: {
    width: theme.dimensions.width50
  },
  width100: {
    width: theme.dimensions.width100
  },
  moveTop: {
    position: 'relative',
    top: -theme.spacing(2.5)
  }
}))

export default function SelectInput({ options, value, labelName, handleChange = () => { }, ...props }) {

  const classes = useStyles();

  return (
    <>
      <Grid className={props.fields.marginTop ? classes.moveTop : ''} container xs={6} >
        <Grid item container className={clsx(classes.wrapper)} direction="column">
          <Typography className={classes.label} variant="subtitle1">{props.fields.labelName}</Typography>
          <Controller
            defaultValue={props?.props[props?.fields?.name] | ''}
            name={props.fields.name}
            as={<Select
              className={classes.input}

              inputRef={props?.props?.register}
              variant="outlined">
              {
                props.fields.options.map(option => <MenuItem key={option.id} value={option.id}>{option.value}{
                  props.fields.join ? ` - (${option.id})` : ''
                }</MenuItem>)
              }
            </Select>}
            control={props?.props.control}
          />

        </Grid>
      </Grid>
    </>
  )
}
