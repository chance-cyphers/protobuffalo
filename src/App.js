import React from 'react';
import './App.css';
import * as protobuf from 'protobufjs';
import {remote} from 'electron';
import SourceInput from "./sourceinput/sourceinput";
import {protoLoaded} from "./actions/actions";
import connect from "react-redux/es/connect/connect";

const { dialog } = remote;

function App(props) {

    function readProto() {
        dialog.showOpenDialog({properties: ['openFile', 'multiSelections']})
            .then((value) => {
                const filepath = value.filePaths[0];
                return protobuf.load(filepath);
            })
            .then((root) => {
                props.protoLoaded(root);
            })
            .catch(err => {
                console.error(err);
            });
    }

    function handleClick() {
        readProto();
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

export default connect(null, { protoLoaded })(App);
