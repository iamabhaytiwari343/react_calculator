import React, { useState, useEffect, useCallback } from 'react';
import Footer from './Footer';
import * as math from 'mathjs';

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
            const calculatedResult = math.evaluate(input);
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
                <div className="buttons">
                <div className='button' onClick={() => handleButtonClick(1)}>1</div>
                <div className='button' onClick={() => handleButtonClick(2)}>2</div>
                <div className='button' onClick={() => handleButtonClick(3)}>3</div>
                <div className='button' onClick={() => handleButtonClick(4)}>4</div>
                <div className='button' onClick={() => handleButtonClick(5)}>5</div>
                <div className='button' onClick={() => handleButtonClick(6)}>6</div>
                <div className='button' onClick={() => handleButtonClick(7)}>7</div>
                <div className='button' onClick={() => handleButtonClick(8)}>8</div>
                <div className='button' onClick={() => handleButtonClick(9)}>9</div>
                <div className='button' onClick={() => handleButtonClick(0)}>0</div>
                <div className='button' onClick={() => handleButtonClick('+')}>+</div>
                <div className='button' onClick={() => handleButtonClick('-')}>-</div>
                <div className='button' onClick={() => handleButtonClick("*")}>*</div>
                <div className='button' onClick={() => handleButtonClick("/")}>/</div>
                <div className='button' onClick={() => handleButtonClick(".")}>.</div>
                <div className='button' onClick={handleCalculate}>=</div>
                <div className='button' onClick={handleClear}>CLR</div>
                <div className='button' onClick={handleMemoryAdd}>M=</div>
                <div className='button' onClick={handleMemorySubtract}>M-</div>
                <div className='button' onClick={handleMemoryRecall}>MR</div>
                <div className='button' onClick={handleMemoryClear}>MC</div>
                </div>
                
 
            </div>
            <Footer />
        </div>
    );
};

export default Calculator;
