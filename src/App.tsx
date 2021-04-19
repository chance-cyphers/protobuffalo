import React from 'react';
import './App.css';
import ProtoView from "./components/protoview/protoview";
import {loadProtoClicked} from "./actions/actions";
import {connect} from "react-redux";

function App(props: any) {

    function handleClick() {
        props.loadProtoClicked();
    }

    return (
        <div className="App">
            <header className="App-header">
                Hallo
                <button onClick={handleClick}>Load Proto</button>
                <ProtoView/>
            </header>
        </div>
    );
}

export default connect(null, { loadProtoClicked })(App);
