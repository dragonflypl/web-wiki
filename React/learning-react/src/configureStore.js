import { v4 } from 'node-uuid';
import { devToolsEnhancer } from 'redux-devtools-extension';
import todoApp from './reducers';
import { createStore } from 'redux'

export default function configureStore() {
  const idOne = v4();
  const idTwo = v4();
  const initialState = {
    todos: {
      byId: {
        [idOne]: { id: idOne, text: 'Buy fruits' },
        [idTwo]: { id: idTwo, text: 'Buy wegetables', completed: true }
      }
    }
  }
  const store = createStore(
    todoApp,
    initialState,
    devToolsEnhancer());

  return store;
}
