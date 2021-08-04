import React from 'react';
import {Box, Divider, Grid, Tab, Tabs} from "@material-ui/core";
import {connect} from "react-redux";
import JsonInput from "../jsoninput/jsoninput";
import {tabClicked} from "../../actions/actions";

const TabsView = (props: any) => {

  const handleChange = (event: any, newValue: any) => {
    props.tabClicked(newValue);
  };

  return (
      <div>
        <Divider/>

        <Tabs value={props.currentTab} onChange={handleChange} aria-label="simple tabs example">
          <Tab value="one" label="TLS" disabled/>
          <Tab value="two" label="Request (form)" disabled/>
          <Tab value="three" label="Request (JSON)"/>
          <Tab value="four" label="Response"/>
        </Tabs>

        <Grid item xs={12}>
          <Divider/>
        </Grid>

        <Grid item xs={12}>
          <TabPanel value={props.currentTab} index="one">
            Do you really need security?
          </TabPanel>
        </Grid>

        <Grid item xs={12}>
        </Grid>
        <Grid item xs={12}>
        </Grid>
        <TabPanel value={props.currentTab} index="two">
          No forms are implemented yet :(
        </TabPanel>
        <TabPanel value={props.currentTab} index="three">
          <JsonInput/>
        </TabPanel>
        <TabPanel value={props.currentTab} index="four">
          Response: {props.response}
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
              {children}
            </Box>
        )}
      </div>
  );
}

const mapStateToProps = (state: any) => {
  const {proto} = state;
  return proto;
};

const mapDispatchToProps = {tabClicked};

export default connect(mapStateToProps, mapDispatchToProps)(TabsView);