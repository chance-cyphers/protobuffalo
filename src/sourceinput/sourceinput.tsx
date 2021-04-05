import React, {ChangeEvent} from 'react';
import {connect} from "react-redux";
import {methodSelected, serviceSelected} from "../actions/actions";
import {Method, Service} from "../reducers/sourceInputReducer";

const SourceInput = (props: any) => {

  function handleServiceChange(event: ChangeEvent<HTMLSelectElement>) {
    props.serviceSelected(event.target.value);
  }

  function handleMethodChange(event: ChangeEvent<HTMLSelectElement>) {
    props.methodSelected(event.target.value);
  }

  return (
      <div>
        <p>
          {props.stuff}
        </p>
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
      </div>
  )
};

const mapStateToProps = (state: any) => {
  const {sourceInput} = state;
  return sourceInput;
};

const mapDispatchToProps = {serviceSelected, methodSelected};

export default connect(mapStateToProps, mapDispatchToProps)(SourceInput);