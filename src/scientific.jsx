// src/components/ScientificCalculator.js
import React, { useState } from 'react';

const Scientific = () => {
    const [input, setInput] = useState('');

    const handleButtonClick = (value) => {
        if (value === '=') {
            try {
                setInput(eval(input).toString());
            } catch (error) {
                setInput('Error');
            }
        } else if (value === 'C') {
            setInput('');
        } else if (value === 'sqrt') {
            setInput(Math.sqrt(parseFloat(input)).toString());
        } else if (value === '^') {
            setInput(input + '^');
        } else if (value === 'sin') {
            setInput(Math.sin(parseFloat(input)).toString());
        } else if (value === 'cos') {
            setInput(Math.cos(parseFloat(input)).toString());
        } else if (value === 'tan') {
            setInput(Math.tan(parseFloat(input)).toString());
        } else {
            setInput(input + value);
        }
    };

    return (
        <div className="calculator">
            <div className="input">
                <input type="text" value={input} readOnly />
            </div>
            <div className="buttons">
                {/* Numeric and basic operation buttons */}
                {/* ... (existing buttons) */}
                <button onClick={() => handleButtonClick('sqrt')}>√</button>
                <button onClick={() => handleButtonClick('^')}>^</button>
                <button onClick={() => handleButtonClick('sin')}>sin</button>
                <button onClick={() => handleButtonClick('cos')}>cos</button>
                <button onClick={() => handleButtonClick('tan')}>tan</button>
                {/* ... (more scientific functions) */}
            </div>
        </div>
    );
};

export default Scientific;
