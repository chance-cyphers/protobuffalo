import React from 'react';
import './App.css';
import * as protobuf from 'protobufjs';
import { remote } from 'electron';
import SourceInput from "./sourceinput/sourceinput";
const { dialog } = remote;

function App() {

    function readProto() {
        dialog.showOpenDialog({ properties: ['openFile', 'multiSelections'] })
            .then((value) => {
                const filepath = value.filePaths[0];
                return protobuf.load(filepath);
            })
            .then((root) => {
                const type = root.lookupType("awesomepackage.AwesomeMessage");
                console.log(`type: ${JSON.stringify(type)}`);
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

export default App;
