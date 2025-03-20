'use client';

import { useState, useRef } from 'react';
import Layout from '../navigation';

function App() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [taxValueSum, setTaxValueSum] = useState(0);
    const [currentUserList, setCurrentUserList] = useState([]);
    const inputRef = useRef();
    const buttonRef = useRef();

    const customCalc = ({isAdmin, isTop, isHigh, money}) => {
        if(isAdmin){
            return Math.floor(money / 100) * 4;
        }
        if(isTop){
            return Math.floor(money / 100) * 10;
        }
        if(isHigh){
            return Math.floor(money / 100) * 7;
        }
        return Math.floor(money / 100) * 5;
    }

    const handleClear = () => {
        setInput('');
        setOutput('');
        setTaxValueSum(0)
        setCurrentUserList([])
        inputRef.current.focus();
    };

    const handleCalculate = () => {
        setOutput((prev) => {
            let userList = input.split('\n');
            let result = '';
            let totalValue = 0;
            let id = 0;
            let flag = true;
            for (let user of userList) {
                const match = user.match(/:\w+:\d+\.\s(.+?)\s\((\d+)\)\s-\s(\d+)/);
                if (match) {
                    id++;
                    let user = match[1];
                    let money = Number(match[3]);
                    let taxValue = 0;
                    if(user == 'thebruhlmaoman')
                        flag = false
                    taxValue = customCalc({
                        isAdmin: user == 'thebruhlmaoman' || user == 'thebruhlmaoman.',
                        isHigh: flag,
                        isTop: id === 1,
                        money
                    });
                    // if (id === 1) taxValue = Math.floor(money / 100) * 10;
                    // else taxValue = Math.floor(money / 100) * 5;
                    setCurrentUserList((prev) => [
                        ...prev,
                        {
                            name: user,
                            tax: taxValue,
                            id: match[2],
                        },
                    ]);
                    totalValue += taxValue;
                    result += `${id}. ${user} - ${taxValue} (${money} -> ${money - taxValue})\n`;
                }
            }
            setTaxValueSum(totalValue);
            return result;
        });
        setInput('');
        inputRef.current.focus();
    };

    const handleView = () => {
        setOutput((prev) => {
            let list = currentUserList;
            let result = '';
            let id = 1;
            for (let user of list) {
                result += `${id++}. ${user.name}:\n`;
                result += `wkakeraremove ${user.id} ${user.tax}\n\n`;
            }
            return result;
        });
    };

    return (
        <Layout>
            <div className="wrapper">
                <div className="header">
                    <h1>Mudae Tax Calculator</h1>
                    <h4>By BidenJr</h4>
                    <p>{'Copy from wtsvid, 1 user per line (Ex: :kakeraO:4. thebruhlmaoman (664398851762946058) - 158542)'}</p>
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
                            onClick={handleCalculate}
                            ref={buttonRef}
                            disabled={input.length === 0}
                        >
                            <span>Calculate</span>
                        </button>
                        <button className="btn btn-add" onClick={handleView} disabled={currentUserList.length === 0}>
                            <span>Script</span>
                        </button>
                    </div>
    
                    <textarea className="output-area" rows="25" cols="50" defaultValue={output} readOnly></textarea>
                </div>
                <div className="result">
                    <p>Total: {taxValueSum}</p>
                </div>
            </div>
        </Layout>
    );
}

export default App;
