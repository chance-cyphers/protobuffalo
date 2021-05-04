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
import JsonInput from "../jsoninput/jsoninput";
import {Divider, Grid, InputLabel, makeStyles, MenuItem, Select, TextField} from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'left',
    color: 'black'
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

        <Grid item xs={12}>
          My Proto
        </Grid>

        <Grid item xs={12}>
          <TextField id="outlined-basic" label="URL" variant="filled" value={props.serverAddress}
                     onChange={handleServerAddrChanged}/>
        </Grid>

        <Grid item xs={6}>
          <InputLabel id="service-label">Service</InputLabel>
          <Select
              labelId="service-label"
              onChange={handleServiceChange}
              value={props.selectedService ? props.selectedService.name : ""}
          >
            {props.services.map((s: Service) => {
              return (<MenuItem value={s.name} key={s.name}>{s.name}</MenuItem>)
            })}
          </Select>
        </Grid>

        <Grid item xs={6}>
          <InputLabel id="method-label">Method</InputLabel>
          <Select
              labelId="method-label"
              onChange={handleMethodChange}
              value={props.selectedMethod ? props.selectedMethod.name : ""}
          >
            {
              props.selectedService ?
                  props.selectedService.methodsArray.map((m: Method) => {
                    return (<MenuItem value={m.name} key={m.name}>{m.name}</MenuItem>)
                  })
                  : null
            }
          </Select>
        </Grid>

        <Grid item xs={12}>
          <Divider/>
        </Grid>

        <Grid item xs={3}>TLS</Grid>
        <Grid item xs={3}>Request (form)</Grid>
        <Grid item xs={3}>Request (JSON)</Grid>
        <Grid item xs={3}>Response</Grid>

        <Grid item xs={12}>
          <Divider/>
        </Grid>

        <Grid item xs={12}>
          <JsonInput/>
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