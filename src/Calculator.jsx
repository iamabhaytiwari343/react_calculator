import React, { useState, useEffect, useCallback } from 'react';

const Calculator = () => {
    const [input, setInput] = useState('');
    const [result, setResult] = useState('');
    const [memory, setMemory] = useState(null);

    const MAX_INPUT_LENGTH = 20;

    const handleClear = useCallback(() => {
        setInput('');
        setResult('');
    }, []);

    const handleCalculate = useCallback(() => {
        try {
            // Avoid using eval for security reasons
            // You can use a library like math.js for safe expression evaluation
            const calculatedResult = eval(input);
            if (isNaN(calculatedResult) || !isFinite(calculatedResult)) {
                setResult('Error');
            } else {
                setResult(calculatedResult.toString());
            }
        } catch (error) {
            setResult('Error');
        }
    }, [input]);

    const handleButtonClick = useCallback((value) => {
        if (input.length < MAX_INPUT_LENGTH) {
            setInput(input + value);
        }
    }, [input]);

    const handleMemoryAdd = useCallback(() => {
        if (input) {
            try {
                setMemory((prevMemory) => (prevMemory !== null ? prevMemory + parseFloat(input) : parseFloat(input)));
            } catch (error) {
                // Handle error
            }
        }
    }, [input]);

    const handleMemorySubtract = useCallback(() => {
        if (input) {
            try {
                setMemory((prevMemory) => (prevMemory !== null ? prevMemory - parseFloat(input) : -parseFloat(input)));
            } catch (error) {
                // Handle error
            }
        }
    }, [input]);

    const handleMemoryRecall = useCallback(() => {
        if (memory !== null) {
            setInput(memory.toString());
        }
    }, [memory]);

    const handleMemoryClear = useCallback(() => {
        setMemory(null);
    }, []);

    const handleKeyDown = useCallback((event) => {
        const key = event.key;
        if (
            (/[0-9]/.test(key) || ['+', '-', '*', '/', '.', 'Enter', 'Escape'].includes(key)) &&
            !event.repeat
        ) {
            if (key === 'Enter') {
                handleCalculate();
            } else if (key === 'Escape') {
                handleClear();
            } else {
                handleButtonClick(key);
            }
        }
    }, [handleCalculate, handleClear, handleButtonClick]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);

    return (
        <div>
            <div>
                <div className='input'>
                    <input type='text' value={input} readOnly />
                </div>
                <div className='result'>
                    <span>{result !== '' ? result : '0'}</span>
                </div>
                <div className='buttons'>
                    <div className='row'>
                        {[7, 8, 9, '/'].map((value) => (
                            <button key={value} onClick={() => handleButtonClick(value.toString())}>
                                {value}
                            </button>
                        ))}
                    </div>
                    <div className='row'>
                        {[4, 5, 6, '*'].map((value) => (
                            <button key={value} onClick={() => handleButtonClick(value.toString())}>
                                {value}
                            </button>
                        ))}
                    </div>
                    <div className='row'>
                        {[1, 2, 3, '-', '.', 0].map((value) => (
                            <button key={value} onClick={() => handleButtonClick(value.toString())}>
                                {value}
                            </button>
                        ))}
                        <button onClick={handleClear}>CLR</button>
                        <button onClick={handleCalculate}>=</button>
                        <button onClick={() => handleButtonClick('+')}>+</button>
                    </div>
                    <div className='row'>
                        <button onClick={handleMemoryAdd}>M+</button>
                        <button onClick={handleMemorySubtract}>M-</button>
                        <button onClick={handleMemoryRecall}>MR</button>
                        <button onClick={handleMemoryClear}>MC</button>
                    </div>
                </div>
            </div>
            <footer className='calculator-footer'>
                {/* Add content for the footer */}
                <p>created by <a href="">Abhay Tiwari</a></p>
                <p>Calculator App &copy; 2023</p>
            </footer>
        </div>
    );
};

export default Calculator;
