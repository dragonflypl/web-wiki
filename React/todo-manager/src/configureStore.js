import todoApp from './reducers';
import { createStore } from 'redux';

const persistedState = {
  todos: [
    { id: 1, text: 'one' },
    { id: 2, text: 'two', completed: true },
    { id: 3, text: 'three', completed: true }
  ]
}

export default createStore(todoApp, persistedState);
