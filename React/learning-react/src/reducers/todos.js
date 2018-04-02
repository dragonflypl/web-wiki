import { combineReducers } from 'redux'
/**
 * Default export is the reducer
 * @param {*} state
 * @param {*} action
 */
function byId(state = {}, { type, id, text }) {
  switch (type) {
    case ('TOGGLE_TODO'):
      return {
        ...state,
        [id]: { ...state[id], completed: !state[id].completed }
      }
    case ('ADD_TODO'):
      return {
        ...state,
        [id]: { text, id }
      }
    default:
      return state;
  }
}

function allIds(state = [], action) {
  if (action.type === 'ADD_TODO') {
    return [...state, action.id];
  }
  return state;
}

export default combineReducers({ byId, allIds })

/**
 * Selector for visible todos. State corresponds to reducers state.
 * @param {*} state
 * @param {*} filter
 */
export function getVisibleTodos(state, filter = 'all') {
  return Object.values(state.byId).filter(todo => {
    return (filter === 'all') ||
      (filter === 'completed' && todo.completed) ||
      (filter === 'active' && !todo.completed);
  })
}
