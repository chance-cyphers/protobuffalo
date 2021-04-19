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
    }
  }

  return (
      <div>
        <textarea
            onChange={handleJsonChanged}
            onKeyDown={makeTabsWork}
            value={props.jsonBody}
            rows={20}
            cols={60}
        />
      </div>
  )

};

const mapStateToProps = (state: any) => {
  const {proto} = state;
  return proto;
};

const mapDispatchToProps = {jsonBodyChanged};

export default connect(mapStateToProps, mapDispatchToProps)(JsonInput);