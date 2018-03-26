import {
  createStore,
  combineReducers
} from 'redux';

function todos(state = [{ text: 'Learn react', id: 0 }], action) {
  return state;
}

function visibilityFilter(state = {}, action) {
  return state;
}

const demoApp = combineReducers({
  todos,
  visibilityFilter
})

export const store = createStore(demoApp);
