import { combineReducers } from 'redux';
import todos, * as fromTodos from './todos';

export default combineReducers({ todos });

export const getErrorMessage = (state) =>
  fromTodos.getErrorMessage(state.todos);

export const getIsFetching = (state) =>
  fromTodos.getIsFetching(state.todos);

export const getVisibleTodos = (state, filter) =>
  fromTodos.getVisibleTodos(state.todos, filter)
