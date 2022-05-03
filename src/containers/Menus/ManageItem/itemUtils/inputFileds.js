import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AttachFile } from '@material-ui/icons';
import { IconButton, InputAdornment, Grid } from '@material-ui/core';

import CommonInput from '../../../../components/CommonInput/CommonInput';
import SelectInput from '../../../../components/Universal/SelectInput';
import CheckboxInput from '../../../../components/Universal/CheckboxInput';
import SelectInputChips from '../../../../components/Universal/SelectInputChips';



const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(1 / 2),
  },
  item_file_input: {
    position: 'relative',
    opacity: `${0} !important`,
    zIndex: 10,
    top: theme.spacing(4)
  },
  iconButton: {
    position: 'absolute', right: theme.spacing(1)
  },
  startAdornment: {
    position: 'absolute',
    marginLeft: theme.spacing(1.5),
  },
  textIndent: {
    textIndent: theme.spacing(4)
  }
}));

export default function InputFields(props) {
  const classes = useStyles();

  return (
    <Grid container spacing={2}>
      {props.FieldsData.fields.map((fields) => {
        if (fields.type === 'select' && fields.name === 'category') {
          return <SelectInputChips options={props.category} props={props} fields={fields} />
        }
        if (fields.type === 'select' && fields.name === 'taxes') {
          return <SelectInputChips options={props.taxes} props={props} fields={fields} />
        }
        if (fields.type === 'select') {
          return <SelectInputChips props={props} fields={fields} />
        }
        if (fields.type === 'checkbox') {
          return <CheckboxInput color="primary" props={props} {...fields} />
        }
        if (fields.type === 'file') {
          return (<Grid xs={fields.parentClass} key={fields.id} className={classes.paper}>
            <CommonInput
              endAdornment={
                fields.endAdornment ? <InputAdornment position="end">
                  <IconButton
                    className={classes.iconButton}
                    aria-label="toggle password visibility"
                  >
                    <AttachFile />
                  </IconButton>
                </InputAdornment> : null
              }
              css={classes.item_file_input}
              props={props} fields={fields} />
          </Grid>)
        }
        return (
          <Grid xs={fields.parentClass} key={fields.id} className={classes.paper}>
            <CommonInput
              textIndent={fields.startAdornment ? classes.textIndent : ''}
              startAdornment={fields.startAdornment ? <InputAdornment className={classes.startAdornment} position="start">{fields.iconText}</InputAdornment> : null}
              props={props} fields={fields} />
          </Grid>
        )
      })
      }
    </Grid>
  )
}
