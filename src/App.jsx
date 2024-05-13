import React from 'react';
import './App.css';
import Calculator from './Calculator.jsx';



function App() {

  return (
    <div className="App">
      <div className="app">
        <h1>Calculator App</h1>
        <div className="calculator-grid">
          <Calculator />
        </div>
      </div>

    </div>
  );
}

export default App;
