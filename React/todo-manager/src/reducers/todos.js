import { combineReducers } from "redux";

const byId = (state = {}, action) => {
  switch (action.type) {
    case 'TOGGLE_TODO_SUCCESS': {
      return {
        ...state,
        [action.response.id]: action.response
      }
    }
    case 'ADD_TODO_SUCCESS': {
      return {
        ...state,
        [action.response.id]: action.response
      }
    }
    case 'FETCH_TODOS_SUCCESS': {
      const nextState = { ...state };
      action.response.forEach(todo => {
        nextState[todo.id] = todo;
      })
      return nextState;
    }
    default:
      return state;
  }
}

const errorMessage = (state = null, action) => {
  switch (action.type) {
    case 'FETCH_TODOS_FAILURE':
      return action.message;
    case ('FETCH_TODOS_REQUEST'):
    case ('FETCH_TODOS_SUCCESS'):
      return null;
    default:
      return state;
  }
}

const isFetching = (state = false, action) => {
  switch (action.type) {
    case ('FETCH_TODOS_REQUEST'):
      return true;
    case ('FETCH_TODOS_FAILURE'):
    case ('FETCH_TODOS_SUCCESS'):
      return false;
    default:
      return state;
  }
}

/**
 * Default export is the reducer
 * @param {*} state
 * @param {*} action
 */
export default combineReducers({ byId, isFetching, errorMessage });

/**
 * Selector for visible todos. State corresponds to reducers state.
 * @param {*} state
 * @param {*} filter
 */
export function getVisibleTodos(state, filter) {
  return Object.values(state.byId).filter(todo => {
    return (!filter || filter === 'all') ||
      (filter === 'completed' && todo.completed) ||
      (filter === 'active' && !todo.completed)
  })
}

/**
 * Selector that exposes info fetch error
 * @param {*} state
 */
export function getErrorMessage(state) {
  return state.errorMessage;
}

/**
 * Selector that exposes info about data fetching
 * @param {*} state
 */
export function getIsFetching(state) {
  return state.isFetching;
}
