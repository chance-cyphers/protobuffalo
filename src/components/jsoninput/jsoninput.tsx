import React, {ChangeEvent, KeyboardEvent, KeyboardEventHandler} from 'react';
import {connect} from "react-redux";
import {jsonBodyChanged} from "../../actions/actions";
import {TextField} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";


const JsonInput = (props: any) => {

  function handleJsonChanged(event: ChangeEvent<HTMLTextAreaElement>) {
    props.jsonBodyChanged(event.target.value);
    // console.log(`selection start: ${event.target.selectionStart}`);
  }

  function makeTabsWork(event: any) {
    if (event.keyCode === 9) {
      event.preventDefault();
    }
  }

  return (
      <FormControl fullWidth>
        <TextField
            label="JSON Body"
            multiline
            onChange={handleJsonChanged}
            onKeyDownCapture={makeTabsWork}
            minRows={8}
            variant="outlined"
            value={props.jsonBody}
        />
      </FormControl>
  )

};

const mapStateToProps = (state: any) => {
  const {proto} = state;
  return proto;
};

const mapDispatchToProps = {jsonBodyChanged};

export default connect(mapStateToProps, mapDispatchToProps)(JsonInput);