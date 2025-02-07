'use client';

import { useState, useRef } from 'react';
import Layout from '../navigation';

function App() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const inputRef = useRef();
    const buttonRef = useRef();

    const handleClear = () => {
        setInput('');
        setOutput('');
        inputRef.current.focus();
    };

    const handleConvert = () => {
        setOutput((prev) => {
            let haremList = input.split('\n');
            let mp = new Map();
            let result = '';
            for (let waifu of haremList) {
                let arr = waifu.split('|');
                if (arr.length > 1) {
                    let [waifu, note] = arr;

                    let waifuList = [];
                    if (mp.get(note)) waifuList = [...mp.get(note)];

                    waifuList.push(waifu.trim());
                    mp.set(note.trim(), waifuList);
                }
            }
            for (const [note, list] of mp.entries()) {
                result += 'wn ';
                let cnt = 0;
                for (let waifu of list) {
                    if (cnt % 50 === 0 && cnt) result += '\n\nwn ';
                    result += `${waifu}$`;
                    cnt++;
                }
                result += `${note}\n\n`;
            }
            return result;
        });
        setInput('');
        inputRef.current.focus();
    };

    const handleDownload = () => {
        const content = output;
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = 'notavirus.txt';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    return (
        <Layout>
            <div className="wrapper">
                <div className="header">
                    <h1>Mudae Harem Note Generator</h1>
                    <h4>By BidenJr</h4>
                    <p>{'1 waifu/husbando per line, note included (Ex: Iochi Mari | 😭)'}</p>
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
                        <button className="btn btn-convert" onClick={handleClear}>
                            <span>Clear</span>
                        </button>
                        <button
                            className="btn btn-add"
                            onClick={handleConvert}
                            ref={buttonRef}
                            disabled={input.length === 0}
                        >
                            <span>Convert</span>
                        </button>
                        <button className="btn btn-convert" onClick={handleDownload} disabled={output.length === 0}>
                            <span>Download</span>
                        </button>
                    </div>

                    <textarea className="output-area" rows="25" cols="50" defaultValue={output} readOnly></textarea>
                </div>
            </div>
        </Layout>
    );
}

export default App;
