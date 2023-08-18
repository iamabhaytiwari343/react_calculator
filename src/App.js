import React, { useState } from 'react';
import * as math from 'mathjs';
import './App.css';
import Footer from './Footer';
import Scientific from './Scientific.jsx';
import Calculator from './Calculator.jsx';

function App() {

  return (
    <div className="App">
      <div className="app">
        <h1>Calculator App</h1>
        <div className="calculator-grid">
          <Calculator />
          <Scientific />
        </div>
      </div>

    </div>
  );
}

export default App;
