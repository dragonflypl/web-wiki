# Redux

## Redux & React - how to connect

`react-redux` connects React container components with Redux store. It is not longer required to pass store explicitly via props. Without it, every container component would have to have a store passed to it explicitly via props to get the state or dispatch actions or via Context API (`getChildContext`).

### Provider component

`Provider` components attaches Redux store to application. It provides redux store to all components automatically (via react context).

### connect

`react-redux`'s `connect` function creates container components and maps state / dispatch actions to props.

```javascript
export default connect(mapStateToProps, mapDispatchToProps)(SomeComponent);
```

`connect` uses context provider by `Provider` component.

### mapStateToProps

`mapStateToProps` defines what parts of store should be exposed to component and mapped to props.

It's first argument is `store`, and second is `ownProps` (properties passed to generated container components):

`mapStateToProps = (state, ownProps) => { return { something: ownProps.sth === state.sth } }`

Now, connected component will have `something` as property.

### mapDispatchToProps

`mapDispatchToProps` exposes actions that component can execute. There's three ways to define actions, most common is to use `bindActionCreators`:

`function mapDispatchToProps(dispatch, ownProps) { return { actions: bindActionsCreators(actions, dispatch) } }`

and in component use `this.props.actions.loadCourses()`

Container component will make state & dispatch to props + it will add

When there're no args to `connect` function, then only `dispatch` will be added to props:

```javascript
import React from 'react';
import { connect } from 'react-redux';

function AddTodo({ dispatch }) {
  return <button onClick={() => dispatch({ type: 'ADD_TODO' })}>Add todo</button>;
}

export default connect()(AddTodo);
```

### Reselect library

Use is in mapStateToProps for caching, as reselect enables memoization: <https://github.com/reactjs/reselect>

## Folder structure

- store actions in `actions` folder. For each logical part, create separate actions file e.g. `courseActions.js`

This is action creator, type property is mandatory:

`export function createCourse(course) { return { type:' CREATE_COURSE', course }}`

- store reducers in `reducers` folder.

This is a reducer (e.g. `courseReducer.js`) :

`export default function courseReducer(state = [], action) { switch(action.type) ... }`

Create a root reducer in `index.js`:

```javascript
import {combineReducers} from 'redux'
import courses from './courseReducer'; // some reducer

const rootReducer = combineReducers({courses})

export default rootReducer;
```

Use `combineReducers`  for reducers composition.

## Three principles

- single immutable state tree (object) / store (it stores data & ui state) contains everything in the application that can change (data & UI state)
- state tree is readonly. actions trigger changes. Action is minimal representation of change to data. Structure must have `type` property. Components just dispatch actions and their work is done.
- reducers update store: state mutations are described by pure functions (reducers) & action

### Enforcing immutability

Use `redux-immutable-state-invariant`. Use is only in development.

or

Use `Immutable.js`

or

`deep-freeze`.

## Reducers

Functions that take current state and actions and return new state.

Each reducer is responsible for its slice of the state.

Reducers are pure functions!

A single action can be handled by all, some or none of reducers.

Reducer should initialize state if previous one is undefined:

```javascript
const counter = (state = 0, action) => {
	case...
	default:
		return state;
}
```

## Actions & Action creators

Action creators are functions that create actions, e.g.

```javascript
export function rateCourse(rating) {
  return { type: 'RATE_COURSE', rating }
}

export function toggleTodo(id) {
  return { type: 'TOGGLE_TODO', id }
}

export function setVisibilityFilter(filter) {
  return { type: 'SET_VISIBILITY_FILTER', filter };
}
```

These actions, are then dispatched to the store:

```javascript
const mapDispatchToProps = (dispatch, { filter }) => {
  return {
    onClick: () => dispatch(setVisibilityFilter(filter))
  }
}
```

or:

```javascript
const mapDispatchToProps = (dispatch) => {
  return {
    onTodoClick: (id) => dispatch(toggleTodo(id))
  }
}
```

or (`dispatch` is injected to props thanks to `connect` call):

```javascript
import React from 'react';
import { connect } from 'react-redux';
import { addTodo } from '../actions';

function AddTodo({ dispatch }) {
  let input;
  return (<div>
    <input ref={ref => input = ref} />
    <button onClick={() => dispatch(addTodo(input.value))}>Add todo</button>
  </div>);
}

export default connect()(AddTodo);
```

## Store API

- createStore

```javascript
const store = createStore(rootReducer);
```

- store.dispatch(action)
- store.subscribe(listener)
- store.getState()
- replaceReducer(nextReducer)

## Combining reducers

Redux provides utility function `combineReducers` that combines reducers into single reducer.

```javascript
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
```
