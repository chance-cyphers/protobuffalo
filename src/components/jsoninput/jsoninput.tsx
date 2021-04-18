import React, {ChangeEvent, KeyboardEvent} from 'react';
import {connect} from "react-redux";
import {jsonBodyChanged} from "../../actions/actions";


const JsonInput = (props: any) => {

  function handleJsonChanged(event: ChangeEvent<HTMLTextAreaElement>) {
    props.jsonBodyChanged(event.target.value);
    console.log(`selection start: ${event.target.selectionStart}`);
  }

  function makeTabsWork(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.keyCode === 9) {
      event.preventDefault();
      console.log(`loc: ${event.which}`);

    }
  }

  return (
      <div>
        <textarea onChange={handleJsonChanged} onKeyDown={makeTabsWork} value={props.jsonBody}/>
      </div>
  )

};

const mapStateToProps = (state: any) => {
  const {sourceInput} = state;
  return sourceInput;
};

const mapDispatchToProps = {jsonBodyChanged};

export default connect(mapStateToProps, mapDispatchToProps)(JsonInput);