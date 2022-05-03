import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AttachFile } from '@material-ui/icons';
import { IconButton, InputAdornment, Grid, Box } from '@material-ui/core';
import clsx from 'clsx';

import CommonInput from '../../../../../components/CommonInput/CommonInput';
import SelectInput from '../../../../../components/Universal/SelectInput';
import CheckboxInput from '../../ManageSideMenu/sideMenuUtils/checkbox';
import SelectInputChips from '../../../../../components/Universal/SelectInputChips';



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
  },
  moveTop: {
    position: 'relative',
    top: theme.spacing(-1.55)
  },
  moveDown: {
    position: 'relative',
    top: theme.spacing(2)
  },
  displayNone: {
    display: 'none'
  }
}));

export default function InputFields(props) {
  const classes = useStyles();
  const watchFields = props.watchFields;
  return (
    <Grid container spacing={2}>
      {props.FieldsData.fields.map((fields) => {
        if (fields.type === 'select') {
          return <Grid item xs={6}
            className={clsx(classes.moveTop, fields.parent ? watchFields[fields.parent] ? "" : classes.displayNone : '')}
          >
            <SelectInputChips display={fields.parent ? watchFields[fields.parent] : true} options={props.categories} props={props} fields={fields} />
          </Grid>
        }
        if (fields.type === 'checkbox') {
          return <Box width="100%" paddingLeft={1.2} mb={1} mt={1} >
            <CheckboxInput selected={watchFields[fields.name]} color="primary" props={props} {...fields} />
          </Box>
        }
        return (
          <Grid xs={fields.parentClass} key={fields.id} className={clsx(classes.paper, classes.moveDown, fields.parent ? watchFields[fields.parent] ? "" : classes.displayNone : '')}>
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
