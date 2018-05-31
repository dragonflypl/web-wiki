## What is Redux Saga

* It a process (saga) manager - it starts/stops sagas
* Redux middleware for managing side-effects (async communication: db, timers, api calls) i.e. anything that does not fit into reducers / selectors
* More sophisticated than `redux-thunk`
* it is black box that consumes and emits actions or side-effects
* effective for **apps with async operations**
* maintains continously running processes called _sagas_
* it uses effects and plain actions to coordinate sagas

## What is a Saga

Saga is a long running "thread" / function.

Saga is ES6 Generator function that yields effects.

* Listens for actions and dispatches actions (using effects)
* It is long running background process
* Creates application's side effects
* Redux-saga is process manager, that sagas can communicate with

Redux-saga works with generator functions and yield keyword & Promises.

## Effects

Effect objects cause side-effects when yielded **inside a Redux Saga app**.

Effect is utility of redux saga.

Effects are interpreted by Redux Saga.

Sagas yield effects e.g. `yield effects.take('SOME_ACTION');`

### take / put

`take` Pauses saga execution until action is dispatched:

```js
const actionPayload = yield effects.take('SOME_ACTION');
```

`put` dispatches an action.

So put & take can be used to communicate between sagas.

### call / apply

Instead of calling some function directly, `call` effect will do it.

Apply? Don't get it...

### fork

Just like call, except values yielded from forked function cannot be captured.

And also fork does not pause code execution: caller continues without pausing.

Forks run independently.

### takeEvery

Combination of take and fork. For each action it forks new method.

It returns immadetely (contrary to take).

`takeEvery('SOME_ACTION', methodToFork)`

### cancel & cancelled

These are two effects for cancelling the process that was created with fork, and for checkking cancellation status.

### takeLatest

Combination of fork, cancel, takeEvery.

Each time action arrives, previous process is cancelled before new one is forked.

### spawn

Just like fork, however spawned process is not a child of a caller process.

If caller cancells or throws error, then spawned process won't be affected.

### all

This effect takes array of take effects and waits until all resolve and then caller is resumed.

## Channels

### Action Channel

Actions channel works like a buffer (a queue) that stores all actions that were dispatched. All actions get executed, nothing is lost.

Compared to regular `take('SOME_ACTION')`, if process is doing something (like delay of any other async operation) and waiting, then subsequent actions will be lost (won't be processed).

If we `take(SOME_CHANNEL)`, then it will take oldest action (`FIFO`).

### Event Channel

Wraps and outside source of evenst (i.e. WebSockets).

Event channels convert some event into actions that can work with `take` and other effects.

### Generic Channel

Establishes communication between two channels.

## Testing

There're two ways of testing:

### Unit testing (testing effects)

This method does not require store nor application state.

However it is stricly connected to implementation details. So even if the output of saga is the same, but implementation deails has changed, then test would need to be rewriten.

### E2E tests

Requires more mocking (like store, state, API's etc).

On the bright side it focuses or how application looks like before and after the saga.

## Installation

Simple as :

```js
import createSagaMiddleware from 'redux-saga';
const sagaMiddleware = createSagaMiddleware();
// and use this middleware
```

## Redux-saga and Promises

They play nicely: library is automatically waiting for the promise to resolve before advancing to next step.

## Resources

* Sample app:
  * https://github.com/danielstern/redux-saga-cart
  * https://github.com/danielstern/redux-saga-shopping-cart-server
