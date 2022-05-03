import React, { useContext } from 'react';
import { Grid, Typography } from '@material-ui/core';

import DataDialog from '../../Universal/DataDailog';
import ENUMS from '../../../utils/enum';

export function ReviewProfile({
  title, action, data, ...props
}) {


  const handleSubmit = () => {
    return props?.handleClose();
  };

  const textOk = ENUMS.BUSINESS.OKAY;

  return (
    <>
      <DataDialog
        {...props}
        textOk={textOk}
        textCancel={ENUMS.CANCEL}
        actionMode={ENUMS.SINGLE}
        loading={false}
        handleSubmit={handleSubmit}
      >
        <Grid container spacing={3} direction="column">
          <Grid item justify="center" container justify="space-between" alignItems="center">
            <Typography variant="h4">{title}</Typography>
          </Grid>
          <Grid item alignItems="center">
            <Typography>
              {ENUMS.BUSINESS.PROFILE_REVIEW}
            </Typography>
          </Grid>
        </Grid>
      </DataDialog>
    </>
  );
}
