import React from 'react'
import { Box, Grid, useTheme } from '@material-ui/core'
import Orderoutertab from './OrderOuterTab'

export default function TabSection(props) {


  return (
    <>
      <Box bgcolor={useTheme().palette.common.white} height="100vh">
        <Grid item container direction="column">
          <Grid item xs={12}>
            <Orderoutertab />
          </Grid>

        </Grid>
      </Box>
    </>
  )
}
