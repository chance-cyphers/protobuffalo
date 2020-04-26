import React from 'react';
import './App.css';
import * as fs from 'fs';

function App() {

    function handleClick() {
        fs.readFile('/Users/bob/test.txt', (err, data) => {
            if (err) {
                alert(err);
            } else {
                alert(data);
            }
        });
    }

    return (
        <div className="App">
            <header className="App-header">
                Hallo
                <button onClick={handleClick}>Press</button>
            </header>
        </div>
    );
}

export default App;
