import React from 'react';
import { Grid, FormControlLabel, Typography } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { truncate } from 'lodash';

import MRCButton from '../../components/Button/MRCButton';
import ENUMS from '../../utils/enum';


export default function Category({
  category,
  menu,
  classes,
  handleCreateItem,
  handleEditCategory,
}) {
  return (
    <>
      <Grid container alignItems="center" justify="space-between">
        <Grid item xs={5}>
          <FormControlLabel
            aria-label="Acknowledge"
            onClick={(event) => event.stopPropagation()}
            onFocus={(event) => event.stopPropagation()}
            control={(
              <MRCButton
                title={category.name}
                className={classes.categoryName}
                variant="text"
                color="default"
                onClick={() => handleEditCategory(menu, category)}
              >
                {truncate(category.name, {
                  length: 20
                })}
              </MRCButton>
            )}
            label=""
          />
        </Grid>
        <Grid item xs={2} container justify="flex-start">
          <Typography className={classes.secondaryHeading} variant="h5">
            {category?.menuItems?.length} {ENUMS.ITEMS}
          </Typography>
        </Grid>
        <Grid item xs={1} />
        <Grid item xs={2} container justify="space-between">
          <Grid item xs={1} />
          <FormControlLabel
            aria-label="Acknowledge"
            onClick={(event) => event.stopPropagation()}
            onFocus={(event) => event.stopPropagation()}
            control={(
              <MRCButton
                variant="text"
                color="primary"
                text="primary"
                onClick={() => handleCreateItem(menu, category)}
                color="primary"
              >
                <Add fontSize="small" className={classes.addIcon} color="primary" />
                &nbsp;{ENUMS.ADD_ITEM}
              </MRCButton>
            )}
            label=""
          />
        </Grid>
      </Grid>
    </>
  );
}
