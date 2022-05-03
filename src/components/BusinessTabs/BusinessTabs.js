import React from 'react';
import { Grid, Tab, Tabs } from '@material-ui/core';
import TabPanel from './TabComponents';
import BusinessProfile from '../BusinessProfile';
import { handleChange, list, useStyles, tabProps } from './tabUtils';
import Branding from '../../../pages/branding';
import BusinessBranding from '../../containers/Branding';


export default function BusinessTabs() {
  const classes = useStyles();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  }
  const [value, setValue] = React.useState(0);
  return (
    <Grid container justify="center">
      <div className={classes.root}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="standard"
          aria-label="Business tabs"
        >
          {
            list.menuItems.map((ele, index) => <Tab key={index} label={ele.title} {...tabProps(ele.id)} />)
          }
        </Tabs>
        <TabPanel value={value} index={0}>
          <BusinessProfile />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <BusinessBranding />
        </TabPanel>
      </div>
    </Grid>
  );
}