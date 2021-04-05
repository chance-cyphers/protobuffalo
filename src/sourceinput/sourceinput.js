import React from 'react';
import {connect} from "react-redux";
import {serviceSelected} from "../actions/actions";

const SourceInput = (props) => {

  function handleChange(event) {
    console.log(`event: ${event.target.value}`);
    props.serviceSelected(event.target.value);
  }

  return (
      <div>
        <p>
          {props.stuff}
        </p>
        <select onChange={handleChange}>
          {props.services.map(s => {
            return (<option key={s.name}>{s.name}</option>)
          })}
        </select>
      </div>
  )
};

const mapStateToProps = state => {
  const {sourceInput} = state;
  return sourceInput;
};

const mapDispatchToProps = {serviceSelected};

export default connect(mapStateToProps, mapDispatchToProps)(SourceInput);