import { devToolsEnhancer } from 'redux-devtools-extension';
import todoApp from './reducers';
import { createStore } from 'redux'
import fetchTodos from './api'

export default function configureStore() {

  fetchTodos()

  const store = createStore(
    todoApp,
    devToolsEnhancer());

  return store;
}
