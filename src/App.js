import { useState } from 'react';
import * as math from 'mathjs';
import './App.css';
import Footer from './Footer';

function App() {
  const [input, setInput] = useState('');
  const [result, setresult] = useState('');
  const handleButtonClick = (value) => {
    setInput(input + value);
  };
  const handleClear = () => {
    setInput('');
    setresult('');
  }
  const handleCalculate = () => {
    try {
      const result = math.evaluate(input);
      if (isNaN(result) || !isFinite(result)) {
        setresult("Error");
      }
      else {
        setresult(result.toString());
        setInput(result.toString());
      }
    } catch (error) {
      setresult("Error")

    }
  };
  return (
    <div className="App">
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

      </div>
      <Footer />
    </div>
  );
}

export default App;
