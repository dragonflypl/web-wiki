


# Redux / ngrx

> Redux is great at bringing a maintainable structure to angular projects. But it also brings a LOT of boilerplate code. And I really mean A LOT. Use it only when application's complexity needs it (not small/tiny apps)

What is state complexity:
- real time feeds
- UI state
- locally created data
- cached data
- server reponses

> Medium+ apps with at least some non trival data flow (multiple view working on he same piece of data without parent-child relationship) and you start create custom event mechanisms to communicate between components (events spagetti)

Benefits:
- architecture / framework decoupling 
- predictable application state
- great deal of codebase will be very easy to test (function programming, reducers, simple functions are tested)
- timetravel extensions for debugging + undo/redo

Angular applications can become quite hard to overlook as they become bigger. Information is passed from parent-components to child-components, @Output goes into @Input, and at the end of the day, nobody knows where the malformed result comes from.

In angular, it is also possible, to pass objects between components. This can be done using the @Input & @Output decorators or via a shared service. Either way, keeping track of which components alters the state becomes an impossible task quite quickly. Especially when working with a big application and/or team.

Simply put, Redux is a principle of organizing your applications code structure, to keep the state of your application at a central place.

Redux promises to resolve the issues mentioned above, by saving the state in one single object, called the store. This concept is called Single Source of Truth. It also ensures a one-directional flow, by making the state read-only.

## Reactive angular

We can split components into two categories:
- container: aware of store, dispatch actions & read from store
- presentational: not aware of store, invokes @Output callbacks, read from @Inputs

***Main principles of Redux are:***

## Single Source of Truth

Whole application state, all variables etc are in single place (makes debugging easier).
It can be not only the data, but also UI state. Basically everything that can change in the application can (should) be included in single JavaScript object.

## Read-Only State

Everything saved in the store is read only.

To change the state in any way, we have to make a request in form of an action (dispatch an action).

### Avoiding object mutations - immutable update patterns

For array, use `...` operator along with map/concat/filter etc. methods that return new arrays.

For objects use `Object.assign` or `...`.

To be sure you create new state, use `deep-freeze`

## Reacting to changes is done with pure functions / reducers

State mutations are done/described only with pure functions. Pure functions take current state and dispatched action.

We will later learn, that we can not only make request in form of actions, but can also react to an action. For that, we will register an reducer. This reducer is a pure function. That means, it takes the state, makes a copy of it and then applies the changes to the copy. This is a principle that comes from functional programming and is meant to greatly reduce side-effects.
We will take a look at pure functions when we talk about reducers.


## Concepts

### Immutability, why?

- predictability
- explicit state changes in reducers
- performance
- mutation tracking
- undo state changes

### One-way dataflow (different from Angular's one-way dataflow)

component -> action -> reducer -> state -> component

### State flows down

Store -> Service -> Component -> Template

### Events flow up

Store <- Service <- Component <- Template

## Redux building blocks

### Store / state

Simple JS object that contains application state.

Single communication point between components.

Basically components no longer manage their own state, they delegate it to somehing else, which is store.

State in single state tree - plain JavaScript object composed by reducers.

Store features:
- state container
- components interact with the store
  - subscribe to slices of state
  - dispatch actions to the store
- store invokes reducers with previous state and action
- reducers compose new state
- store is updated, notifies subscribers

#### Creating the store

Store is created with root reducer, that describes how state is updated with actions.

### Actions

Something has happened in the application.

Have two properties: type & payload. 

Actions are dispatched to reducers.

### Reducer

Function that specifies how store / state changes in response to actions.

Store passes action to reducer.

It updates the store.

Reducers are pure functions that take state & action & return new state.

Reducer is responsible for managing only a slice of application state.

#### Root reducer

The one that is passed to `StoreModule.provideStore`

#### Reducers composition

If reducer is doing to many things, e.g. updates arrays + single items (like `todos` reducer), it's recommended to extract second reducer from it e.g. `todos` + `todo` and call `todo` reducer from `todos`. 

Bottom line: reducers should deal with different parts of state tree and deal only with this part they are responsible for.

Another way of reducers composition is to create a new reducer that aggregates other reducers: 

`{ stateA: reducerA(state.stateA, action), stateB: reducerB(state.stateA, action) }`;

This is scalable solution. It's also so popular, that there's a helper util `combineReducers` function.

### Selectors

#### select operator

Select operator returns observable that emits only if value changes (distinctUntilChanged)

```
this.visibleTodos$ = combineLatest(
  this.store.select(state => state.todos),
  this.store.select(state => state.visibilityFilter),
  this.calcVisibleTodos
)
```

We’ve seen that in most cases, using select() with combineLatest will suffice, but there are special cases wher recelect can help.

#### reactjs/reselect

Selectors are functions to express what we want to retrieve from store. This way we do not expose store's internal structure / selection logic.

Use it to create advanced selectors that use memoization:

> https://netbasal.com/lets-talk-about-select-and-reselect-in-ngrx-store-177a2f6045a8

### Effects

Centralizes all async work.

They handle async operations: http requests, web-sockets

### Features

Features are a way to split one big store into smaller pieces.

Features are separate slices of your store that can live for themselves.

## Immutability

Immutability is at core of redux. Why immutability:
- performance
- easier debugging
- coherence (only reducers create new state)

## Smart vs Dump components

Smart components have knowledge about the state.

Dump are just given data, and they render it.

## Devtools

- Use env settings to conditionally wire up `store/devtools`
- Use `ngrx-store-freeze` in dev mode to enforce immutability of state (this is meta reducer).
- https://github.com/substack/deep-freeze

# NGRX Store + Effects course

Store is container for state. State live in the store. 
Store allows to manipulate / access / monitor & observe state.

## What is application state

- server response
- user information
- user input (forms etc)
- UI state (navigation/dropdowns)
- router / location state (url bar)

# Resources

- https://platform.ultimateangular.com/courses/ngrx-store-effects/lectures/3788515 - great free course with source code here https://github.com/dragonflypl/ngrx-store-effects-app
- https://egghead.io/courses/getting-started-with-redux react + redux but introduction is universal
- https://blog.nrwl.io/ngrx-patterns-and-techniques-f46126e2b1e5 NgRx: Patterns and Techniques
- https://malcoded.com/posts/angular-ngrx-guide - cool article with complete small app, however I don't like naming conventions (NgRx: Patterns and Techniques does better job)
- sample app
  - https://github.com/ngrx/example-app
  - https://github.com/onehungrymind/dashing-angular
  - https://github.com/webmaxru/ngrx-store-demo
  - https://github.com/JavascriptMick/ng2-state-talk repo for talk that shows step by step evolution of application
- https://www.youtube.com/watch?v=Y2hKn7skC0c - cool app & talk
- https://www.youtube.com/watch?v=f97ICOaekNU quick intro with really basic setup 
- https://www.youtube.com/watch?v=fAsoqn1MZ5Y - good talk with sample application
- https://www.youtube.com/watch?v=pjwVq8B-ZAw really cool & funny talk and show step by step an evolution of the application from muttable state in components -> services -> ngrx
- http://www.ngx.solutions/understanding-features-in-ngrx-4/ features in ngrx
- https://toddmotto.com/preloading-ngrx-store-route-guards populating store with route guards
- https://medium.com/developers-writing/a-class-based-approach-to-writing-reducers-in-redux-ngrx-4a8ec5f97b1 - article with class based reducers - don't use it!

## Use Case

1. Create `store` folder with `index.ts` and `actions`, `effects`, `reducers` subfolders.
2. For actions, implement `Action` interface
3. Create actions / reducers per store slice (like todos, pizzas, events, etc.)
4. For accessing state slice, use `store.select` or selectors. Selector a function when we compose different levels of state and return a new piece of state. To create selectors use: `createFeatureSelector`, `createSelector`
5. For side effect , use ngrx/effects. effects allow to listen for actions and isolate side effects (like async oparations) . Effects listen for store actions. Don't do async operations in reducers which are pure functions. To get back from effect to store, effects dispatch action.
6. For router integration use ngrx/router. Use it for state managmenet of history (e.g. routerLink can be used and router state will be updated), but remember to also use effects & actions to encapsulate navigation (like programmatic changes of location).
7. For preloading data on route changes, use route guards
8. In testing effects, use marble tests
