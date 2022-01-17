import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Symfoni } from './hardhat/SymfoniContext';

ReactDOM.render(
  <React.StrictMode>
    <Symfoni autoInit={true} loadingComponent={<h1>Loading...</h1>}>
    <App />
    </Symfoni>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
