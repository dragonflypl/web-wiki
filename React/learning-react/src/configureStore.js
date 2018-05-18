import { composeWithDevTools } from 'redux-devtools-extension';
import todoApp from './reducers';
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

export default function configureStore() {

  const middlewares = [thunk, createLogger]

  const store = createStore(
    todoApp,
    composeWithDevTools(applyMiddleware(...middlewares))
  );

  return store;
}
