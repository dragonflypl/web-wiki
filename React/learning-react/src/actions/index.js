let id = 1;

/**
 * Action creator: creates object that will be dispatched to the store
 * @param {*} text
 */
export function addTodo(text) {
  return { type: 'ADD_TODO', text, id: id++ }
}


export function toggleTodo(id) {
  return { type: 'TOGGLE_TODO', id }
}

export function setVisibilityFilter(filter) {
  return { type: 'SET_VISIBILITY_FILTER', filter };
}
