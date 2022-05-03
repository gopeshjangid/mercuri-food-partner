import React from 'react';
import { Grid, Box, useTheme } from '@material-ui/core';

import ItemDescription from './itemDescription';

export default function ItemsTabs({ ...props }) {

  return (
    <>

      <Box borderRadius={8} p={3} bgcolor={useTheme().palette.common.white}>
        <ItemDescription {...props} />
      </Box>

    </>
  )
}
