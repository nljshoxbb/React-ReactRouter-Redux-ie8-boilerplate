require('es5-shim');
require('es5-shim/es5-sham');
require('console-polyfill');


const React = require('react');
const ReactDOM = require('react-dom');

const App = require('../../pages/app').default;

ReactDOM.render(
    <App />
  ,
  document.getElementById('app')
);