import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import demoApp from './reducers';
import { createStore } from 'redux'
import { Provider } from 'react-redux';

const initialState = {
  todos: [
    { id: 1, text: 'Buy fruits' },
    { id: 2, text: 'Buy wegetables', completed: true }
  ]
}
const store = createStore(demoApp, initialState);

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

registerServiceWorker();


