import { useState, useRef } from 'react';
import 'normalize.css';
import './App.css';

function App() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [copied, setCopied] = useState(false);
    const inputRef = useRef();
    const buttonRef = useRef();

    const handleAdd = () => {
        setOutput((prev) => {
            let haremList = input.split('\n');
            let result = prev;
            for (let waifu of haremList) {
                waifu = waifu.trim();
                let idx = -1;
                for (let i in waifu) {
                    if (waifu[i] === '|') idx = i;
                }
                if (idx !== -1) waifu = waifu.slice(0, idx).trim();
                if (waifu.length) result += waifu + '$';
            }
            return result;
        });
        setInput('');
        inputRef.current.focus();
    };

    const handleClear = () => {
        setInput('');
        setOutput('');
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
                console.error('Failed to copy text: ', err);
            });
    };

    return (
        <div className="wrapper">
            <div className="header">
                <h1>Mudae Harem List Generator</h1>
                <h4>By BidenJr</h4>
                <p>{'1 waifu/husbando per line, notes are ok (Ex: Iochi Mari | 😭)'}</p>
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
                    <button className="btn btn-add" onClick={handleAdd}>
                        <span>Add</span>
                    </button>
                    <button className="btn btn-convert" onClick={handleClear}>
                        <span>Clear</span>
                    </button>
                    <button className="btn btn-copy" onClick={handleCopy} ref={buttonRef} disabled={input.length}>
                        <span>{copied ? "Copied" : "Copy"}</span>
                    </button>
                </div>

                <textarea className="output-area" rows="25" cols="50" defaultValue={output}></textarea>
            </div>
        </div>
    );
}

export default App;
