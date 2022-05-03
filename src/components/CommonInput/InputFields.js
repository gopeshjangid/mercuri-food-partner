import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import CommonInput from './CommonInput';
import Businesshours from '../BusinessProfile/BusinessHours';
import Ordertype from '../BusinessProfile/OrderType';
import SelectInput from '../Universal/SelectInput';
import CheckboxInput from '../Universal/CheckboxInput';
import { MRCSwitch } from '../Switch';
import { Box, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(1 / 2),
  },
}));
export default function InputFields(props) {
  const classes = useStyles();
  const { posSystemType, partnerType } = props;

  return (
    <Grid container spacing={2}>

      {props.FieldsData.fields.map((fields, index) => {
        if (fields.name === 'schedule') {
          return <Businesshours key={index} props={props} fields={fields} />
        }
        if (fields.name === 'orderType') {
          return <Ordertype key={index} props={props} fields={fields} />
        } if (fields.type === 'select') {
          return <SelectInput key={index} props={props} fields={fields} />
        }
        if (fields.type === 'checkbox') {
          return <CheckboxInput key={index} color="primary" props={props} {...fields} />
        }
        return (
          <Grid key={index} xs={fields.parentClass} key={fields.id} className={classes.paper}>
            <CommonInput props={props} fields={fields} />
          </Grid>
        )
      })
      }
    </Grid >
  )
}
