import React, {ChangeEvent} from 'react';
import {connect} from "react-redux";
import {
  jsonBodyChanged,
  methodSelected,
  rpcInvoked,
  serverAddressChanged,
  serviceSelected
} from "../../actions/actions";
import {Method, Service} from "protobufjs";
import {
  Grid,
  makeStyles,
  TextField,
} from "@material-ui/core";
import TabsView from "../tabsview/tabsview";
import Dropdown from "./dropdown/dropdown";


const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'left',
    color: 'black',
    padding: theme.spacing(2)
  },
  row: {
    marginBottom: theme.spacing(2)
  },
  url: {
    minWidth: 360
  }
}));


const ProtoView = (props: any) => {

  const classes = useStyles();

  function handleServiceChange(event: ChangeEvent<any>) {
    props.serviceSelected(event.target.value);
  }

  function handleMethodChange(event: ChangeEvent<any>) {
    props.methodSelected(event.target.value);
  }

  function handleInvoke() {
    props.rpcInvoked();
  }

  function handleServerAddrChanged(event: ChangeEvent<HTMLInputElement>) {
    props.serverAddressChanged(event.target.value);
  }

  return (
      <Grid container className={classes.root}>

        <Grid item xs={12} className={classes.row}>
          My Proto
        </Grid>


        <Grid item xs={3} className={classes.row}>
          <Dropdown
              label="Env"
              itemValues={["Stuff!"]}
          />
        </Grid>

        <Grid item xs={9}>
          <TextField id="outlined-basic" label="URL" variant="outlined" value={props.serverAddress}
                     className={classes.url}
                     onChange={handleServerAddrChanged}/>
        </Grid>

        <Grid item xs={6} className={classes.row}>
          <Dropdown
              label="Service"
              onChange={handleServiceChange}
              value={props.selectedService ? props.selectedService.name : ""}
              itemValues={props.services.map((s: Service) => {
                return s.name;
              })}
          />
        </Grid>

        <Grid item xs={6}>
          <Dropdown
              label="Method"
              onChange={handleMethodChange}
              value={props.selectedMethod ? props.selectedMethod.name : ""}
              itemValues={
                props.selectedService
                    ? props.selectedService.methodsArray.map((m: Method) => {
                      return m.name;
                    })
                    : null
              }
          />
        </Grid>

        <Grid item xs={12}>
          <TabsView/>
        </Grid>

        <button onClick={handleInvoke} disabled={!props.selectedService || !props.selectedMethod}>Invoke</button>
        <p>Response: </p>
        <p>{props.response}</p>
      </Grid>
  )
};

const mapStateToProps = (state: any) => {
  const {proto} = state;
  return proto;
};

const mapDispatchToProps = {serviceSelected, methodSelected, jsonBodyChanged, rpcInvoked, serverAddressChanged};

export default connect(mapStateToProps, mapDispatchToProps)(ProtoView);