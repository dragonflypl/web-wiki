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

There're three ways to define mapDispatchToProps (`toggleTodo` is action creator):

- function. `mapDispatchToProps` is a function that accepts `dispatch` and returns object that exposes actions that component can execute. Each action (e.g. `onTodoClick`) is a function that will be passed to component.

```javascript
import { toggleTodo } from '../actions';

const mapDispatchToProps = (dispatch) => {
  return {
    onTodoClick: (id) => dispatch(toggleTodo(id))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
```

- object definition shorthand notation

If props callback (`onTodoClick`) and action creator (`toggleTodo`) signatures are the same, `mapDispatchToProps` can we written as an object (not function):

```javascript
import { toggleTodo } from '../actions';

const mapDispatchToProps = {
  onTodoClick: toggleTodo
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TodoList));
```

- `bindActionCreators`:

`function mapDispatchToProps(dispatch, ownProps) { return { actions: bindActionsCreators(actions, dispatch) } }`

and in component use `this.props.actions.loadCourses()`

### No connect args

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

- store actions in `actions` folder. For each logical part (not necessarily the same structure like in reducers), create separate actions file e.g. `courseActions.js`

This is action creator, type property is mandatory:

`export function createCourse(course) { return { type:' CREATE_COURSE', course }}`

Then reexport actions with `index.js`:

```javascript
export * from './visibilityFilter';
export * from './todos';
```

- store reducers in `reducers` folder.

This is a reducer (e.g. `courseReducer.js`) :

`export default function courseReducer(state = [], action) { switch(action.type) ... }`

Later combine reducers, and create root reducer in `index.js`:

```javascript
import { combineReducers } from 'redux';

import todos from './todos';
import visibilityFilter from './visibilityFilter';

export default combineReducers({ todos, visibilityFilter });
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

## Selectors

Selector is a function that has a state as an argument, with additional parameters, and it returns silce of the state.

Simple selectors operate on the state from the reducer they are defined for.

For instance, this is reducer & selector from `todos.js` reducer file.

State parameter for reducer & selectors have the same shape.

```javascript
/**
 * Default export is the reducer
 * @param {*} state
 * @param {*} action
 */
export default function todos(state = [], action) {
  switch (action.type) {
    case ('TOGGLE_TODO'): ...
    case ('ADD_TODO'): ...
    default:
      return state;
  }
}

/**
 * Selector for visible todos. State corresponds to reducers state.
 * @param {*} state
 * @param {*} filter
 */
export function getVisibleTodos(state, filter) {
  const visibilityFilter = filter || 'all';
  return state.filter(todo => {
    return (visibilityFilter === 'all') ||
      (visibilityFilter === 'completed' && todo.completed) ||
      (visibilityFilter === 'active' && !todo.completed);
  })
}
```

### Reexporting selectors from root reducer

Reducer specific selectors (`todosSelectors`) can later be reused and reexported from root reducer as root selector. Once again, state parameter for root reducer and root selectors has the same shape:

```javascript
import { combineReducers } from 'redux';

import todos, * as todosSelectors from './todos';

export default combineReducers({ todos });

/**
 * Selector that hides state internal structure and delegates to todos selectors
 * @param {*} state
 * @param {*} filter
 */
export function getVisibleTodos(state, filter) {
  return todosSelectors.getVisibleTodos(state.todos, filter);
}
```

At the end, you simply import selector from root reducer:

```javascript
import { getVisibleTodos } from '../reducers';

const mapStateToProps = (state, { match }) => ({
  todos: getVisibleTodos(state, match.params.filter)
})
```

Pay attention, that each time selector is called, it simply receives `state` as argument (no internal structure os state is infered by client code).

## Store API

- createStore

```javascript
const store = createStore(rootReducer);
```

It is possible to initialize store with persisted data (e.g. server side rendering), with second argument (keys correspond to reducer names):

```javascript
const initialState = {
  todos: [
    { id: 1, text: 'Buy fruits' },
    { id: 2, text: 'Buy wegetables', completed: true }
  ]
}
const store = createStore(demoApp, initialState);
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

## Async stuff

By default redux allows dispatching plain objects, promises are not supported.

First approach: you can first initiate AJAX call (`fetchTodos`) & then dispatch an action (`receiveTodos` is simple action creator):

```javascript
  getTodos() {
    const { filter, receiveTodos } = this.props;

    fetchTodos(filter).then(response => {
      receiveTodos(filter, response);
    })
  }

  ...

  const mapDispatchToProps = { receiveTodos }
```

where:

```javascript
export function receiveTodos(filter, todos) {
  return { type: 'RECEIVE_TODOS', filter, todos };
}
```

Second approach is to use promise middleware.

## FAQ

### How can I debug redux

<https://github.com/zalmoxisus/redux-devtools-extension>

and use `import { devToolsEnhancer } from 'redux-devtools-extension';` (in simplest approach)

Also you can use `import createLogger from 'redux-logger';` which is a middleware.

### I need to generate unique id

`npm i node-uuid` and `import { v4 } from 'node-uuid`
