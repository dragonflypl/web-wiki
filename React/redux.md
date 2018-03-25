# Redux

## Redux & React - how to connect

react-redux connects React container components with Redux store. 

- `connect` function creates container components and 

```
export default connect(mapStateToProps, mapDispatchToProps)(SomeComponent);
```

mapStateToProps defines what parts of store should be exposed to component. It's first argument is `store`, and second is `ownProps` (properties passed to generated container components):

`mapStateToProps = (state, ownProps) => { return { something: ownProps.sth === state.sth } }`

`mapDispatchToProps` exposes actions that component can execute. There's three ways to define actions, most common is to use `bindActionCreators`:

`function mapDispatchToProps(dispatch, ownProps) { return { actions: bindActionsCreators(actions, dispatch) } }`

and in component use `this.props.actions.loadCourses()`

Container component will make state & dispatch to props + it will add 

- `Provider` components attaches application to Redux store. It provides redux store to all components automatically (via react context)

### Reselect library

Use is in mapStateToProps for caching, as reselect enables memoization: https://github.com/reactjs/reselect

## Folder structure

- store actions in `actions` folder. For each logical part, create separate actions file e.g. `courseActions.js`

This is action creator, type property is mandatory:

`export function createCourse(course) { return { type:' CREATE_COURSE', course }}`

- store reducers in `reducers` folder. 

This is a reducer (e.g. `courseReducer.js`) :

`export default function courseReducer(state = [], action) { switch(action.type) ... }`

Create a root reducer in `index.js`:

```
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

```
const counter = (state = 0, action) => {
	case...
	default:
		return state;
}
```

## Actions & Action creators

Action creators are functions that create actions, e.g.

```
rateCourse(rating) { return { type: 'RATE_COURSE', rating } }
```

## Store API

- createStore

```
const store = createStore(rootReducer);
```

- store.dispatch(action)
- store.subscribe(listener)
- store.getState()
- replaceReducer(nextReducer)
