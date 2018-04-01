import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import demoApp from './reducers';
import { createStore } from 'redux'
import { Provider } from 'react-redux';
import { v4 } from 'node-uuid';
import { devToolsEnhancer } from 'redux-devtools-extension';

const initialState = {
  todos: [
    { id: v4(), text: 'Buy fruits' },
    { id: v4(), text: 'Buy wegetables', completed: true }
  ]
}
const store = createStore(
  demoApp,
  initialState,
  devToolsEnhancer());

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

registerServiceWorker();


