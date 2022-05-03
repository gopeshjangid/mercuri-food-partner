import React from 'react';
import { Grid, Divider, Box, Tab, Tabs, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';


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
          <Grid>{children}</Grid>
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
    width: theme.dimensions.width90
  },
  tabs: {
    overflow: 'visible',
    width: theme.dimensions.width95
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
  }
}));

export default function MRCTab({ tabPanels = [], tabHeaders = [], helperText }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Tabs
        orientation="horizontal"
        variant="scrollable"
        indicatorColor="primary"
        textColor="primary"
        value={value}
        onChange={handleChange}
        className={classes.tabs}
      >
        {
          tabHeaders?.map((tab, index) => <Tab label={tab.label} {...tabProps(index)} />)
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
