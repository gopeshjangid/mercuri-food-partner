import React from "react";
import Drawer from '@material-ui/core/Drawer';
import withStyles from "@material-ui/core/styles/withStyles";


const FullScreenRightDrawer = withStyles(theme => ({
  paperAnchorRight: {
    width: `calc(100% - 200px)`,
    backgroundColor: theme.palette.background.skyblueDark,
    overflow: 'hidden',
    boxShadow: 'none'
  },
  modal: {
    left: '250px !important',
    '& .MuiBackdrop-root': {
      backgroundColor: 'transparent',
      left: '170px'
    }
  }
}))((props) => <Drawer transitionDuration={{ appear: 600, enter: 600, exit: 300 }} anchor={"right"} open={props.open} {...props}>{props.children}</Drawer>)

export default FullScreenRightDrawer;