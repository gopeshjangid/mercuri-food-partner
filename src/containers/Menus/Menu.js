import React from 'react';
import { Grid, Typography, IconButton } from '@material-ui/core';
import { EditTwoTone, Add } from '@material-ui/icons';

import { MRCSwitch } from '../../components/Switch';
import MRCButton from '../../components/Button/MRCButton';
import ENUMS from '../../utils/enum';
import { truncate } from 'lodash';

export default function Menu({
  menu, classes, handleEditMenu, handleCreateCategory, handleActivate,
}) {
  return (
    <Grid item container justify="space-between">
      <Grid item xs={4} container alignItems="center">
        <MRCSwitch
          checked={menu.isActive || false}
          title="Activate Menu"
          onChange={(e) => handleActivate(menu)}
        />
        <Typography color="primary" variant="h5" title={menu.menuName}>
          {truncate(menu?.menuName, {
            length: 12
          })}
        </Typography>
        <IconButton className={classes?.editButton} onClick={() => handleEditMenu(menu)}>
          <EditTwoTone color="action" />
        </IconButton>
      </Grid>
      <Grid item xs={2}>
        <MRCButton variant="outlined" color="primary" onClick={() => handleCreateCategory(menu)}>
          <Add fontSize="small" className={classes.addIcon} color="default" />
          {ENUMS.ADD_CATEGORY}
        </MRCButton>
      </Grid>
    </Grid>
  );
}
