import { combineReducers } from 'redux';

import todos, * as todosSelectors from './todos';

export default combineReducers({ todos });

/**
 * Selectors that hides state internal structure and delegates to todos selectors
 */
export function getVisibleTodos(state, filter) {
  return todosSelectors.getVisibleTodos(state.todos, filter);
}

export function getIsFetching(state) {
  return todosSelectors.getIsFetching(state.todos);
}
