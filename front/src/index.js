import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import axios from 'axios'
axios.defaults.url = 'http://localhost:8080/api/'

ReactDOM.render(
  <React.Fragment>
    <App />
  </React.Fragment>,
  document.getElementById('root')
);


