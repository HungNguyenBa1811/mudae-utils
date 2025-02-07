'use client';

import { useState, useRef } from 'react';

function App() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [copied, setCopied] = useState(false);
    const [harem, setHarem] = useState(0);
    const inputRef = useRef();
    const buttonRef = useRef();

    const handleAdd = () => {
        setOutput((prev) => {
            let seriesList = input.split('\n');
            let result = prev;
            let haremCount = harem;
            for (let series of seriesList) {
                if (haremCount % 50 === 0 && haremCount) result += '\n\n';
                series = series.trim();
                let idx = -1;
                for (let i in series) {
                    if (series[i] === '-') idx = i;
                }
                if (idx !== -1) series = series.slice(0, idx).trim();
                if (series.length) {
                    haremCount++;
                    result += series + '$';
                }
            }
            setHarem(haremCount);
            return result;
        });
        setInput('');
        inputRef.current.focus();
    };

    const handleClear = () => {
        setInput('');
        setOutput('');
        setHarem(0);
        setCopied(false);
        inputRef.current.focus();
    };

    const handleCopy = () => {
        navigator.clipboard
            .writeText(output)
            .then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 1000);
            })
            .catch((err) => {
                console.log('Failed to copy text: ', err);
            });
    };

    return (
        <div className="wrapper">
            <div className="header">
                <h1>Mudae Series List Generator</h1>
                <h4>By BidenJr</h4>
                <p>{'Copy from wmmb, 1 series per line (Ex: Blue Archive - 172/172)'}</p>
            </div>
            <div className="main">
                <textarea
                    className="input-area"
                    rows="25"
                    cols="50"
                    onChange={(e) => setInput(e.target.value)}
                    autoFocus
                    value={input}
                    ref={inputRef}
                ></textarea>

                <div className="btn-group">
                    <button className="btn btn-add" onClick={handleAdd} disabled={input.length === 0}>
                        <span>Add</span>
                    </button>
                    <button className="btn btn-convert" onClick={handleClear}>
                        <span>Clear</span>
                    </button>
                    <button className="btn btn-copy" onClick={handleCopy} ref={buttonRef} disabled={input.length === 0}>
                        <span>{copied ? 'Copied' : 'Copy'}</span>
                    </button>
                </div>

                <textarea className="output-area" rows="25" cols="50" defaultValue={output} readOnly></textarea>
            </div>
        </div>
    );
}

export default App;