import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Root from './Root'
import registerServiceWorker from './registerServiceWorker';
import configureStore from './configureStore';

ReactDOM.render(
  <Root store={configureStore()} />,
  document.getElementById('root'));

registerServiceWorker();
