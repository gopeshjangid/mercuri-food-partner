import React, { useState } from 'react';
import { MenuItem, Grid, Typography, Box } from '@material-ui/core';

import MRCChip from '../../../components/Universal/Chip';
import ENUMS from '../../../utils/enum';
import ManageItem from './ManageSideItem';

export default function Item({
  item, category, classes, categories, partnerId, handleEditMenuItem = () => { },
}) {

  const [openAddItem, setOpenAddItem] = useState(false);
  const [action, setAction] = useState('');
  const handleAddItem = (item, category) => {
    setAction(ENUMS.UPDATE);
    setOpenAddItem(true);
  }
  const handleClose = () => {
    setOpenAddItem(false);
  }

  return (
    <>
      <MenuItem
        className={classes.menuItem}
        onClick={() => handleAddItem(item, category)}
      >
        <Grid xs={12} direction="row" container alignItems="center" justify="space-between">
          <Grid item xs={8}>
            <Box ml={9}>
              <Typography className={classes.heading}>{item.name}</Typography>
            </Box>
          </Grid>
          <Grid item xs={4} container alignItems="center" justify="flex-end">
            <Box mr={2}>
              <Typography variant="subtitle2" className={classes.secondaryHeading}>
                {
                  item.isDefault ? <MRCChip label="Default Item" /> : ``
                }
              </Typography>
            </Box>
            <Box mr={-4}>
              <Typography variant="subtitle2" className={classes.secondaryHeading}>
                {
                  item.isDefault ? "Included" : `$ ${item.price}`
                }
              </Typography>
            </Box>
          </Grid>

        </Grid>
      </MenuItem>
      {
        openAddItem && partnerId && <ManageItem
          categories={categories}
          category={category}
          sideItem={item}
          action={action}
          handleClose={handleClose}
          partnerId={partnerId}
        />
      }
    </>
  );
}
