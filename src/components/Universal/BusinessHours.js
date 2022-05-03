import { Checkbox, createMuiTheme, Divider, Grid, MenuItem, Select, ThemeProvider, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState, useEffect } from 'react';
import { Controller } from 'react-hook-form';
import { connect } from 'react-redux';

import theme from '../../theme';
import ENUMS from '../../utils/enum';
import clsx from 'clsx';

const newTheme = createMuiTheme({
  ...theme,
  overrides: {
    MuiFormControl: {
      root: {
        border: `1px solid ${theme.palette.common.black}`
      }
    },
    MuiInputBase: {
      input: {
        textAlign: 'center'
      }
    }
  }, typography: {
    ...theme.typography,
    fontFamily: 'Open sans                                                                        '
  }, disabled: {
    zIndex: -50
  }
});

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(1, 0)
  },
  input: {
    borderRadius: theme.spacing(1),
    backgroundColor: theme.palette.common.white,
    fontSize: theme.palette.size.default,
    padding: theme.spacing(1.8, 1),
    height: '1.1876em',
    '&:focus': {
      borderColor: theme.palette.primary.main,
      borderRadius: theme.palette.radius.default
    },
    '&:selected': {
      paddingRight: `${theme.spacing(0)} !important`,

    }
  },
}))


function BusinessHourRange({ handleTimeFrom, handleTimeTo, title, ...props }) {

  const classes = useStyles();
  const startTime = new Date(); startTime.setHours(8); startTime.setMinutes(0);
  const endTime = new Date(); endTime.setHours(20); endTime.setMinutes(0);
  const [selectedTimeFrom, setSelectedTimeFrom] = useState('08:00');
  const [selectedTimeTo, setSelectedTimeTo] = useState('22:00');
  const [checked, setChecked] = useState({ active: false, name: '', });
  const [checked24, setChecked24] = useState({ active: false, name: '' });

  const hours = [
    '00:00', '00:30', '01:00', '01:30', '2:00', '2:30', '3:00', '03:30', '04:00', '04:30', '05:00',
    '05:30', '06:00', '06:30', '07:00', '07:30', '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
    '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00',
    '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30',
    '22:00', '22:30', '23:00', '23:30', '23:59'
  ]

  useEffect(() => {

    let isArray = Array.isArray(props.schedule);
    if (isArray) {
      let data = props?.schedule?.find(data => data.name === title)
      setChecked({
        ...data,
        name: title,
      })
      setChecked24({
        name: title,
        active: data?.active24
      })
      setSelectedTimeFrom(data?.active24 ? hours[0] : data?.from)
      setSelectedTimeTo(data?.active24 ? hours[hours.length - 1] : data?.to)
    }

  }, [props?.schedule])

  const handleTimeChangeFrom = (event) => {
    setSelectedTimeFrom(event.target.value)
    let index = props?.schedule?.findIndex(data => data.name === title);
    if (index > -1) {
      let _data = [...props.schedule]
      _data[index] = {
        ..._data[index],
        from: event.target.value,
      }
      return props.setData(_data);
    }
  }

  const handleTimeChangeTo = (event) => {
    setSelectedTimeTo(event.target.value)
    let index = props?.schedule?.findIndex(data => data.name === title);
    if (index > -1) {
      let _data = [...props.schedule]
      _data[index] = {
        ..._data[index],
        to: event.target.value,
      }
      return props.setData(_data);
    }
  }

  const handleCheckbox = (event) => {

    setChecked({
      name: event.target.name,
      active: event.target.checked
    })
    if (!event.target.checked) {
      setChecked24({
        name: event.target.name,
        active: false
      })
    }

    if (!props?.schedule?.length)
      return props.setData([{
        name: event.target.name,
        active: event.target.checked,
        from: selectedTimeFrom,
        to: selectedTimeTo
      }]);

    let index = props?.schedule?.findIndex(data => data.name === event.target.name);
    if (index > -1) {
      let _data = [...props.schedule]
      _data[index] = {
        ..._data[index],
        active: event.target.checked
      }
      return props.setData(_data);
    }

    return props.setData([...props?.schedule, {
      name: event.target.name,
      active: event.target.checked,
      from: selectedTimeFrom,
      to: selectedTimeTo
    }]);
  }

  const handleCheckbox24 = (event) => {

    setChecked24({
      name: event.target.name,
      active: event.target.checked
    })
    if (event.target.checked) {
      setChecked({
        ...checked,
        active: true
      })
      setSelectedTimeFrom('00:00')
      setSelectedTimeTo('23:59')
    } else {

      setSelectedTimeFrom('08:00')
      setSelectedTimeTo('22:00')
    }


    if (!props?.schedule?.length)
      return props.setData([{
        name: event.target.name,
        active24: event.target.checked,
        from: '00:00',
        to: '23:59'
      }]);

    let index = props?.schedule?.findIndex(data => data.name === event.target.name);
    if (index > -1) {
      let _data = [...props.schedule]
      _data[index] = {
        ..._data[index],
        active24: event.target.checked
      }
      return props.setData(_data);
    }

    return props.setData([...props?.schedule, {
      name: event.target.name,
      active24: event.target.checked,
      from: '00:00',
      to: '23:59'
    }]);
  }


  return (
    <>
      <ThemeProvider theme={newTheme}>
        <Grid item className={clsx(classes.root, props.isTemporaryClosed ? classes.disabled : '')} container direction="row">
          <Grid md={3} lg={2} item container alignItems="center">
            <Checkbox name={title} checked={checked.active || false} onChange={handleCheckbox} color="primary" />
            <Typography>{title}</Typography>
          </Grid>
          <Grid md={6} lg={4} item container justify="center" alignItems="center">

            <Grid xs={5} md={5} lg={4} item container justify="space-between">
              <Controller
                control={props.props.control}
                name="from"
                defaultValue={checked?.from}
                render={({ onChange, name, value, ref }) => <Select
                  name="from"
                  disabled={checked24.active}
                  classes={{
                    root: classes.input,
                    select: {
                      '&$outlined': {
                        paddingRight: theme.spacing(0)
                      }
                    }
                  }}
                  inputRef={ref}
                  value={selectedTimeFrom} onChange={handleTimeChangeFrom}
                  fullWidth variant="outlined">
                  <MenuItem value='24 Hours'>{ENUMS['24HOURS']}</MenuItem>
                  <Divider />
                  {
                    hours.map((hour, index) => <MenuItem key={index} value={hour}>{hour}</MenuItem>)
                  }
                </Select>}
              />
            </Grid>
            <Typography>&nbsp;&nbsp;&nbsp;to&nbsp;&nbsp;&nbsp;</Typography>
            <Grid xs={5} md={5} lg={4} item container justify="space-between">
              <Controller
                control={props.props.control}
                name="to"
                defaultValue={checked?.to}
                render={({ onChange, name, value, ref }) => <Select
                  name="to"
                  disabled={checked24.active}
                  classes={{
                    root: classes.input
                  }}
                  inputRef={ref}
                  value={selectedTimeTo} onChange={handleTimeChangeTo}
                  fullWidth variant="outlined">
                  <MenuItem value='24 Hours'>{ENUMS['24HOURS']}</MenuItem>
                  <Divider />
                  {
                    hours.map((hour, index) => <MenuItem key={index} value={hour}>{hour}</MenuItem>)
                  }
                </Select>}
              />
            </Grid>

          </Grid>
          <Grid md={3} lg={3} item container alignItems="center">
            <Checkbox name={title} checked={checked24.active || false} onChange={handleCheckbox24} color="primary" />
            <Typography>{ENUMS.OPEN24HRS}</Typography>
          </Grid>
        </Grid>
      </ThemeProvider>
    </>
  )
}


export default connect(state => ({
  schedule: state.scheduleReducer.schedule
}), {})(BusinessHourRange)