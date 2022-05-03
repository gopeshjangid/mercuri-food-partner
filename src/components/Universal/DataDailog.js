import React, { useState } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Grid, Typography, Dialog, DialogContent, CircularProgress, Box } from '@material-ui/core';


import MCButton from '../Button/MRCButton';
import MRCButton from '../Button/MRCButton';
import ENUMS from '../../utils/enum';


const useStyles = makeStyles((theme) => ({
  formWrapper: {
    background: theme.palette.common.white,
    width: '100%',
    padding: theme.spacing(3),
  },
  title: {
    textTransform: 'capitalize',
    paddingBottom: theme.spacing(2),
  },
  actionButtons: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: theme.spacing(2.5),
    textAlign: 'right',
    justifyContent: 'center',
    '& button': {
      margin: theme.spacing(2),
      textTransform: 'capitalize',
    },
  },
  labelText: {
    color: theme.palette.grey[500],
  },
  width100: {
    width: theme.dimensions.width100
  },
  width50: {
    width: theme.dimensions.width50
  },
  justifyCenter: {
    display: 'flex',
    justifyContent: 'center'
  },
  CircularProgress: {
    position: 'absolute'
  }
}));

const DataDialog = ({
  children, loading, title, maxWidth, textCancel, textOk, actionMode, handleClose, handleSubmit,
}) => {
  const classes = useStyles();

  return (
    <Dialog
      maxWidth={maxWidth || 'sm'}
      fullWidth
      open
      onClose={handleClose}
      aria-labelledby="create-form"
    >
      <DialogContent>
        <div className={classes.formWrapper}>
          {children}
          <Box className={classes.actionButtons}>
            {
              actionMode !== ENUMS.SINGLE &&
              <MRCButton disabled={loading} labelText={classes.labelText} type="button" variant="outlined" color="tertiary" onClick={handleClose}>{textCancel || 'Cancel'}</MRCButton>
            }
            <MRCButton
              width={actionMode === ENUMS.SINGLE ? classes.width50 : classes.width100}
              loading={loading}
              type="submit"
              variant="contained"
              color="primary"
              onClick={() => {
                handleSubmit && handleSubmit();
              }}
            >
              {textOk}
            </MRCButton>

          </Box>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DataDialog;
