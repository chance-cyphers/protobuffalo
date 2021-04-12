import React, {ChangeEvent} from 'react';
import {connect} from "react-redux";
import {jsonBodyChanged, methodSelected, rpcInvoked, serverAddressChanged, serviceSelected} from "../actions/actions";
import {Method, Service} from "../reducers/sourceInputReducer";

const SourceInput = (props: any) => {

  function handleServiceChange(event: ChangeEvent<HTMLSelectElement>) {
    props.serviceSelected(event.target.value);
  }

  function handleMethodChange(event: ChangeEvent<HTMLSelectElement>) {
    props.methodSelected(event.target.value);
  }

  function handleJsonChanged(event: ChangeEvent<HTMLTextAreaElement>) {
    props.jsonBodyChanged(event.target.value);
  }

  function handleInvoke() {
    props.rpcInvoked();
  }

  function handleServerAddrChanged(event: ChangeEvent<HTMLInputElement>) {
    props.serverAddressChanged(event.target.value);
  }

  return (
      <div>
        <p>
          {props.stuff}
        </p>
        <input type="text" value={props.serverAddress} onChange={handleServerAddrChanged} />
        <br/>
        <select onChange={handleServiceChange}>
          {props.services.map((s: Service) => {
            return (<option key={s.name}>{s.name}</option>)
          })}
        </select>
        <select onChange={handleMethodChange}>
          {
            props.selectedService ?
                props.selectedService.methods.map((m: Method) => {
                  return (<option key={m.name}>{m.name}</option>)
                })
                : ""
          }
        </select>
        <br/>
        <textarea onChange={handleJsonChanged} value={props.jsonBody} />
        <br/>
        <button onClick={handleInvoke}>Invoke</button>
      </div>
  )
};

const mapStateToProps = (state: any) => {
  const {sourceInput} = state;
  return sourceInput;
};

const mapDispatchToProps = {serviceSelected, methodSelected, jsonBodyChanged, rpcInvoked, serverAddressChanged};

export default connect(mapStateToProps, mapDispatchToProps)(SourceInput);