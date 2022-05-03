import React from 'react'
import { Chip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  chip: {
    fontWeight: theme.typography.fontWeightBold,
    fontFamily: 'Exo',
    textTransform: 'uppercase !important',
    fontSize: theme.spacing(1.4),
    border: 'none',
    backgroundColor: theme.palette.background.mediumPrimary,
    color: theme.palette.primary.main
  }
}))

export default function MRCChip({ label, ...props }) {

  const classes = useStyles()
  return (
    <>
      <Chip label={label} className={classes.chip} {...props} />
    </>
  )
}
