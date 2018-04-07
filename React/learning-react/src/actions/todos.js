import { v4 } from 'node-uuid';

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

export function receiveTodos(filter, todos) {
  return { type: 'RECEIVE_TODOS', filter, todos };
}

export function requestTodos() {
  return { type: 'REQUEST_TODOS' };
}
