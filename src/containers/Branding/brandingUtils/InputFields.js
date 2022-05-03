import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid, InputAdornment, IconButton } from '@material-ui/core';

import CommonInput from '../../../components/CommonInput/CommonInput';
import ColorPickerInput from '../../../components/CommonInput/ColorPickerInput';
import { AttachFile } from '@material-ui/icons';



const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(1 / 2),
  },
  item_file_input: {
    position: 'relative',
    opacity: `${0} !important`,
    zIndex: 10,
    top: theme.spacing(3.8)
  },
  iconButton: {
    position: 'absolute', right: theme.spacing(1),
    backgroundColor: theme.palette.common.white
  }
}));

export default function InputFields(props) {

  const classes = useStyles();

  return (
    <Grid container spacing={3}>

      {props?.FieldsData?.fields?.map((fields) => {
        if (fields.type === 'colorInput')
          return <Grid xs={fields.parentClass} key={fields.id} className={classes.paper}>
            <Box mb={2}>
              <ColorPickerInput props={props} fields={fields} />
            </Box>
          </Grid>
        if (fields.type === 'file') {
          return (<Grid xs={fields.parentClass} key={fields.id} className={classes.paper}>
            <CommonInput
              css={classes.item_file_input}
              props={props} fields={fields} />
          </Grid>)
        }
        return (
          <Grid xs={fields.parentClass} key={fields.id} className={classes.paper}>
            <Box mt={0}>
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
                props={props} fields={fields} />
            </Box>
          </Grid>
        )
      })
      }
    </Grid>
  )
}
