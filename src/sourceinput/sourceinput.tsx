import React from 'react';
import {connect} from "react-redux";
import {serviceSelected} from "../actions/actions";

const SourceInput = (props: any) => {

  function handleChange(event: any) {
    console.log(`event: ${event.target.value}`);
    props.serviceSelected(event.target.value);
  }

  return (
      <div>
        <p>
          {props.stuff}
        </p>
        <select onChange={handleChange}>
          {props.services.map((s: any) => {
            return (<option key={s.name}>{s.name}</option>)
          })}
        </select>
      </div>
  )
};

const mapStateToProps = (state: any) => {
  const {sourceInput} = state;
  return sourceInput;
};

const mapDispatchToProps = {serviceSelected};

export default connect(mapStateToProps, mapDispatchToProps)(SourceInput);