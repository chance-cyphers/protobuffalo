import React from 'react';
import {Box, Divider, Grid, Tab, Tabs, Typography} from "@material-ui/core";
import {connect} from "react-redux";
import JsonInput from "../jsoninput/jsoninput";


const TabsView = (props: any) => {

  const [value, setValue] = React.useState('three');

  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
  };

  return (
      <div>
        <Divider/>

        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab value="one" label="TLS" disabled />
          <Tab value="two" label="Request (form)" disabled />
          <Tab value="three" label="Request (JSON)"/>
          <Tab value="four" label="Response"/>
        </Tabs>

        <Grid item xs={12}>
          <Divider/>
        </Grid>

        <Grid item xs={12}>
          <TabPanel value={value} index="one">
            Do you really need security?
          </TabPanel>
        </Grid>

        <Grid item xs={12}>
        </Grid>
        <Grid item xs={12}>
        </Grid>
        <TabPanel value={value} index="two">
          No forms are implemented yet :(
        </TabPanel>
        <TabPanel value={value} index="three">
          <JsonInput/>
        </TabPanel>
        <TabPanel value={value} index="four">
          Response
        </TabPanel>
      </div>
  );
};

function TabPanel(props: any) {
  const {children, value, index, ...other} = props;

  return (
      <div
          role="tabpanel"
          hidden={value !== index}
          id={`wrapped-tabpanel-${index}`}
          aria-labelledby={`wrapped-tab-${index}`}
          {...other}
      >
        {value === index && (
            <Box p={3}>
              <Typography>{children}</Typography>
            </Box>
        )}
      </div>
  );
}

export default connect(null, null)(TabsView);