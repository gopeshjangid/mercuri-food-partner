import React from 'react';
import { Grid, Divider, Box, Tab, Tabs, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

function TabPanel(props) {
  const {
    children, value, index, ...other
  } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box width={'100%'} p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function tabProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    width: theme.dimensions.width100
  },
  tabs: {
    overflow: 'visible',
    width: theme.dimensions.width100
  },
  logo: {
    display: 'flex',
    padding: theme.spacing.unit * 4,
  },
  tabpanel: {
    display: 'flex',
    justifyContent: 'center'
  },
  helperText: {
    position: 'relative',
    opacity: 0.6,
    bottom: theme.spacing(-45),
    width: theme.dimensions.width100,
    textAlign: 'center'
  },
  selected: {
    backgroundColor: '#000',
  },
  unSelected: {
    backgroundColor: '#f7faf9',
  },
  customTab: {
    backgroundColor: '#ffff',
    color: theme.palette.common.black,
    borderTopRightRadius: theme.spacing(0.6),
    borderTopLeftRadius: theme.spacing(0.6),
    padding: theme.spacing(2),
    fontWeight: 900,
    '&$selected': {
      backgroundColor: '#f1f5fa',
      borderLeft: `2px solid ${theme.palette.primary.main}`
    },
  },
}));

export default function InnerTab({ tabPanels = [], tabHeaders = [], helperText }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        indicatorColor="none"
        textColor="primary"
        value={value}
        variant="fullWidth"
        onChange={handleChange}
        classes={{

        }}
        className={clsx(classes.tabs, classes.customTab)}
      >
        {
          tabHeaders?.map((tab, index) => <Tab
            classes={{
              root: classes.customTab,
              selected: classes.selected,
              disabled: classes.unSelected
            }}
            label={tab} {...tabProps(index)} />)
        }
      </Tabs>
      <Divider />
      {
        tabPanels?.map((panel, index) =>
          <TabPanel className={classes.tabpanel} value={value} index={index}>
            {panel}
          </TabPanel>)
      }
      <Typography className={classes.helperText} variant="body2">{helperText}</Typography>

    </div>
  );
}
