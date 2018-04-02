import { combineReducers } from 'redux';

import todos, * as todosSelectors from './todos';

export default combineReducers({ todos });

/**
 * Selector that hides state internal structure and delegates to todos selectors
 * @param {*} state
 * @param {*} filter
 */
export function getVisibleTodos(state, filter) {
  return todosSelectors.getVisibleTodos(state.todos, filter);
}
