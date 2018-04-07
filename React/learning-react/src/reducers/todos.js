import { combineReducers } from 'redux'
/**
 * Default export is the reducer
 * @param {*} state
 * @param {*} action
 */
function byId(state = {}, { type, ...payload }) {
  switch (type) {
    case 'RECEIVE_TODOS': {
      const nextState = { ...state };
      payload.todos.forEach(todo => {
        nextState[todo.id] = todo;
      })
      return nextState;
    }
    default:
      return state;
  }
}

export default combineReducers({ byId })

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
