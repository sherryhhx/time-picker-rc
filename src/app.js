import React from 'react';
import ReactDOM from 'react-dom';
import TimPicker from './components/time';

function App() {
    return (
        <TimPicker onTimeChange={(data) => {
            console.log(JSON.stringify(data))

        }} />
    )
}

ReactDOM.render(<App />, document.getElementById('root'));