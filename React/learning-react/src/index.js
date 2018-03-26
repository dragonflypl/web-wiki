import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import demoApp from './rootReducer';
import { createStore } from 'redux'
import { Provider } from 'react-redux';

const store = createStore(demoApp);

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

registerServiceWorker();


