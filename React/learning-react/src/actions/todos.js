import { v4 } from 'node-uuid';
import * as api from '../api';
import { getIsFetching } from '../reducers';
/**
 * Action creator: creates object that will be dispatched to the store
 * @param {*} text
 */
export function addTodo(text) {
  return { type: 'ADD_TODO', text, id: v4() }
}

export function toggleTodo(id) {
  return { type: 'TOGGLE_TODO', id }
}

export const fetchTodos = (filter) => (dispatch, getState) => {
  if (getIsFetching(getState())) {
    console.log('Fetching already in progress');
    return;
  }

  dispatch(requestTodos());
  return api.fetchTodos(filter).then(response => {
    dispatch(receiveTodos(filter, response));
  })
}

function receiveTodos(filter, todos) {
  return { type: 'RECEIVE_TODOS', filter, todos };
}

function requestTodos() {
  return { type: 'REQUEST_TODOS' };
}
