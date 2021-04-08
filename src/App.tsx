import React from 'react';
import './App.css';
import SourceInput from "./sourceinput/sourceinput";
import {loadProtoClicked, protoLoaded} from "./actions/actions";
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
                <SourceInput/>
            </header>
        </div>
    );
}

export default connect(null, { protoLoaded, loadProtoClicked })(App);
