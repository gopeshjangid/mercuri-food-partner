import React from "react";
import SnackbarContent from "@material-ui/core/SnackbarContent/SnackbarContent";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { Offline } from "react-detect-offline";
import ENUMS from "../../utils/enum";

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 600,
  },
  snackbarWrapper: {
    position: 'fixed', bottom: '0', zIndex: 1200
  },
  snackbar: {
    fontFamily: 'Roboto',
    fontWeight: theme.typography.fontWeightMedium,
    margin: theme.spacing(1),
  },
}));


export default function ConnectionMessage() {
  const classes = useStyles();
  return (
    <Offline>
      <div className={classes.snackbarWrapper}>
        <SnackbarContent anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }} className={classes.snackbar}
          message={ENUMS.MESSAGE.OFFLINE} />
      </div>
    </Offline>
  )
}