import {
  createStore,
  combineReducers
} from 'redux';

function todos(state = [], action) {
  switch (action.type) {
    case ('TOGGLE_TODO'):
      return state.map(x => {
        if (x.id !== action.id) {
          return x;
        }
        return {
          ...x,
          completed: !x.completed
        }
      })
    case ('ADD_TODO'):
      return [
        ...state,
        { text: action.text, id: action.id, completed: false }
      ]
    default:
      return state;
  }
}

function visibilityFilter(state = 'SHOW_ALL', action) {
  switch (action.type) {
    case ('SET_VISIBILITY_FILTER'):
      return action.filter;
    default:
      return state;
  }
}

const demoApp = combineReducers({
  todos,
  visibilityFilter
})

export const store = createStore(demoApp);
