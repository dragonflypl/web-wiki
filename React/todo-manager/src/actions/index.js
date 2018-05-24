import * as api from '../api';
import { getIsFetching } from '../reducers';

export const toggleTodo = (id, completed) => (dispatch) => {
  api.toggleTodo(id, completed).then(response => {
    dispatch({
      type: 'TOGGLE_TODO_SUCCESS',
      response
    })
  })
}

export const addTodo = (text) => (dispatch) => {
  api.addTodo(text).then(response => {
    dispatch({
      type: 'ADD_TODO_SUCCESS',
      response
    })
  })
}

export const fetchTodos = (filter) => (dispatch, getState) => {
  if (getIsFetching(getState())) {
    return;
  }
  dispatch({ type: 'FETCH_TODOS_REQUEST' });
  return api.fetchTodos(filter)
    .then(
      response => dispatch({ type: 'FETCH_TODOS_SUCCESS', response, filter }),
      error => dispatch({ type: 'FETCH_TODOS_FAILURE', message: error.message || 'Something is wrong.' })
    )

}
