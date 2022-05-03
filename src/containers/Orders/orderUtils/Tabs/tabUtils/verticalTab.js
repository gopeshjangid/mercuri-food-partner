import React from 'react';
import { makeStyles, createMuiTheme, ThemeProvider, useTheme } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { ArrowForwardIos } from '@material-ui/icons';
import DraftsIcon from '@material-ui/icons/Drafts';
import theme from '../../../../../theme';
import { orders } from '../../data';
import moment from 'moment';

const muiTheme = createMuiTheme({
  overrides: {
    MuiList: {
      padding: {
        padding: `${theme.spacing(0, 0)} !important`
      }
    },
    MuiListItem: {
      root: {
        display: 'flex',
        justifyContent: 'space-between',
        minHeight: theme.spacing(10),
        borderLeft: `${theme.spacing(1)}px solid ${theme.palette.common.white}`,
        "&:hover": {
          borderLeft: `${theme.spacing(1)}px solid transparent`,
        },
        "&$selected": {
          backgroundColor: "#f1f5fa",
          borderLeft: `${theme.spacing(1)}px solid ${theme.palette.primary.main}`,
          transition: 'all 0.6s',
        },
      },
    },
    MuiListItemText: {
      primary: {
        fontWeight: theme.typography.fontWeightBold,
        fontFamily: 'Open Sans',
        fontSize: theme.spacing(2),
        lineHeight: theme.spacing(0.3)
      },
      secondary: {
        fontSize: theme.spacing(1.72),
      }
    }
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  arrowIcon: {
    display: 'flex',
    justifyContent: 'flex-end',
    fontSize: theme.spacing(1.8),
    fontWeight: theme.typography.fontWeightBold
  }
}));

export default function SelectedListItem() {
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  return (
    <ThemeProvider theme={muiTheme}>
      <div className={classes.root}>
        <List component="nav" aria-label="main mailbox folders">
          {
            orders.map((order, index) => <ListItem
              button
              selected={selectedIndex === index}
              onClick={(event) => handleListItemClick(event, index)}
            >
              <ListItemText primary={`Order ${order.orderNo}`} secondary={`${moment(order.orderAt, 'hh:mm A').format('hh:mm A')}`} />
              <ListItemIcon className={classes.arrowIcon} >
                <ArrowForwardIos fontSize="inherit" />
              </ListItemIcon>
            </ListItem>)
          }
        </List>
      </div>
    </ThemeProvider>
  );
}
