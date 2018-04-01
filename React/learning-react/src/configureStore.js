import { v4 } from 'node-uuid';
import { devToolsEnhancer } from 'redux-devtools-extension';
import todoApp from './reducers';
import { createStore } from 'redux'

export default function configureStore() {
  const initialState = {
    todos: [
      { id: v4(), text: 'Buy fruits' },
      { id: v4(), text: 'Buy wegetables', completed: true }
    ]
  }
  const store = createStore(
    todoApp,
    initialState,
    devToolsEnhancer());

  return store;
}
