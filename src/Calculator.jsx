import React, { useState } from 'react'

const Calculator = () => {
    const [input, setInput] = useState('');
    const [result, setResult] = useState('');
    const handleClear = () => {
        setInput('');
        setResult('');
    }
    const handleCalculate = () => {
        try {
            const result = eval(input);
            if (isNaN(result) || !isFinite(result)) {
                setResult('Error');
            } else {
                setResult(result.toString());
            }
        } catch (error) {
            setResult('Error');
        }
    };

    const MAX_INPUT_LENGTH = 20;

    const handleButtonClick = (value) => {
        if (input.length < MAX_INPUT_LENGTH) {
            setInput(input + value);
        }
    };

    const [memory, setMemory] = useState(null);

    const handleMemoryAdd = () => {
        if (input) {
            try {
                setMemory((prevMemory) => (prevMemory !== null ? prevMemory + parseFloat(input) : parseFloat(input)));
            } catch (error) {
                // Handle error
            }
        }
    };

    const handleMemorySubtract = () => {
        if (input) {
            try {
                setMemory((prevMemory) => (prevMemory !== null ? prevMemory - parseFloat(input) : -parseFloat(input)));
            } catch (error) {
                // Handle error
            }
        }
    };

    const handleMemoryRecall = () => {
        if (memory !== null) {
            setInput(memory.toString());
        }
    };

    const handleMemoryClear = () => {
        setMemory(null);
    };

    // Add this to the App component
    React.useEffect(() => {
        const handleKeyDown = (event) => {
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
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleButtonClick, handleCalculate, handleClear]);



    return (
        <div>
            <div className='input'>
                <input type='text' value={input} readOnly />
            </div>
            <div className='result'>
                <span>{result !== '' ? result : '0'}</span>
            </div>
            <div className='buttons'>
                <div className='row'>
                    <button onClick={() => handleButtonClick('7')}>7</button>
                    <button onClick={() => handleButtonClick('8')}>8</button>
                    <button onClick={() => handleButtonClick('9')}>9</button>
                    <button onClick={() => handleButtonClick('/')}>/</button>
                </div>
                <div className='row'>
                    <button onClick={() => handleButtonClick('4')}>4</button>
                    <button onClick={() => handleButtonClick('5')}>5</button>
                    <button onClick={() => handleButtonClick('6')}>6</button>
                    <button onClick={() => handleButtonClick('*')}>*</button>
                </div>
                <div className='row'>

                    <button onClick={() => handleButtonClick('1')}>1</button>
                    <button onClick={() => handleButtonClick('2')}>2</button>
                    <button onClick={() => handleButtonClick('3')}>3</button>
                    <button onClick={() => handleButtonClick('-')}>-</button>
                    <button onClick={() => handleButtonClick('.')}>.</button>
                </div>
                <div className='row'>
                    <button onClick={() => handleButtonClick('0')}>0</button>
                    <button onClick={handleClear}>CLR</button>
                    <button onClick={handleCalculate}>=</button>
                    <button onClick={() => handleButtonClick('+')}>+</button>
                </div>
                <div className="row">
                    <button onClick={handleMemoryAdd}>M+</button>
                    <button onClick={handleMemorySubtract}>M-</button>
                    <button onClick={handleMemoryRecall}>MR</button>
                    <button onClick={handleMemoryClear}>MC</button>
                </div>

            </div>
        </div>
    )
}

export default Calculator