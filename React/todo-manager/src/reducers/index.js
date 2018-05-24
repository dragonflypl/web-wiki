import { combineReducers } from 'redux';

import todos, * as todosSelectors from './todos';

export default combineReducers({ todos });

/**
 * Selectors that hides state internal structure and delegates to todos selectors
 */
export const getErrorMessage = (state) =>
  todosSelectors.getErrorMessage(state.todos);

export const getIsFetching = (state) =>
  todosSelectors.getIsFetching(state.todos);

export const getVisibleTodos = (state, filter) =>
  todosSelectors.getVisibleTodos(state.todos, filter)
